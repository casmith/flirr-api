import { Router } from 'express';
import QueueController from '../controllers/queueController';
import SearchController from '../controllers/searchController';
import ServerController from '../controllers/serverController';
import StatusController from '../controllers/statusController';

const routes = Router();

const marvinBaseUrl = process.env.MARVIN_BASE_URL || 'http://localhost:8081';
const listsDirectory = process.env.LISTS_DIR || 'lists';

const elasticSearchBaseUrl = process.env.ES_BASE_URL || 'http://localhost:9200';
const elasticSearchIndex = process.env.ES_INDEX || 'downloads';

const queueController = new QueueController(marvinBaseUrl);
const searchController = new SearchController(elasticSearchBaseUrl, elasticSearchIndex, listsDirectory);
const serverController = new ServerController(marvinBaseUrl);
const statusController = new StatusController(marvinBaseUrl);

routes.get('/search', (req, res) => searchController.search(req, res));
routes.get('/queue', (req, res) => queueController.get(req, res));
routes.post('/queue', (req, res) => queueController.enqueue(req, res));
routes.get('/status', (req, res) => statusController.get(req, res));

export default routes;
