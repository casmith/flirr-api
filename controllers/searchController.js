const readline = require('readline');
const fs = require('fs');

class SearchController {

    static searchFile(fileName, keywords) {
        return new Promise((resolve, reject) => {
            const readInterface = readline.createInterface({
                input: fs.createReadStream(fileName),
                console: false
            });
    
            const results = [];
            readInterface.on('line', function(line) {
                if (line.startsWith("!") && line.toLowerCase().includes(keywords)) {
                    results.push(line);
                }
            });

            readInterface.on('close', () => resolve(results));
        })
    }

    static transformResults(results) {
        return results.map(result => {
            const [requestString, info] = result.split("::INFO::").map(s => s.trim())
            return {
                nick: requestString.substring(1, requestString.indexOf(" ")),
                filename: requestString.substring(requestString.indexOf(" ") + 1, requestString.length),
                info,
                requestString
            };
        });
    }
    
    static search(req, res) {
        const { keywords } = req.query;
        return Promise.all(fs.readdirSync('lists').map(file => SearchController.searchFile(`lists/${file}`, keywords)))
            .then(results => results.flat())
            .then(results => SearchController.transformResults(results))
            .then(results => res.status(200).json(results));           
    }
}
export default SearchController;
