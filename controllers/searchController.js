const readline = require('readline');
const fs = require('fs');
const ElasticSearchService = require('../elasticSearchService').default;

class SearchController {

    constructor(elasticSearchBaseUrl, elasticSearchIndex, listsDirectory) {
        this.listsDirectory = listsDirectory;
        this.elasticSearchService = new ElasticSearchService(elasticSearchBaseUrl, elasticSearchIndex);
    }

    searchFile(fileName, keywords) {
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

    transformResults(results) {
        return results.map(this.transformResult);
    }

    transformResult(result) {
        const [requestString, info] = result.split("::INFO::").map(s => s.trim())
        return {
            nick: requestString.substring(1, requestString.indexOf(" ")),
            filename: requestString.substring(requestString.indexOf(" ") + 1, requestString.length),
            info,
            requestString
        };
    }
    
    search(req, res) {
        const { keywords } = req.query;

        return this.elasticSearchService.search(keywords)
            .then(esResults => esResults.map(album => {
              album.tracks = this.transformResults(album.tracks);
              return album;
            }))
            .then(results => res.status(200).json(results))
            .catch((e) => {
                console.error(e)
                return res.status(500).json(e)
            });
    }
}
export default SearchController;
