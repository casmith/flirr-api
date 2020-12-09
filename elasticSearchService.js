const { Client } = require('@elastic/elasticsearch')

class ElasticSearchService {

    constructor(url, index) {        
        this.index = index;
        this.client = new Client({node: url});
    }

    search(query) {
        return this.client.search({
                index: this.index,
                from: 20,
                size: 10,
                body: {},
                default_operator: 'AND', 
                q: query
            }, {
                ignore: [404],
                maxRetries: 3
            })
        .then(x => x.body.hits.hits.map(hit => hit._source))
        .catch(e => console.log(JSON.stringify(e)));
    }
}

export default ElasticSearchService;