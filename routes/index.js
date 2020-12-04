import { Router } from 'express';
import QueueController from '../controllers/queueController';
import SearchController from '../controllers/searchController';

const routes = Router();

const marvinBaseUrl = process.env.MARVIN_BASE_URL || 'http://localhost:8081';
const listsDirectory = process.env.LISTS_DIR || 'lists';

const queueController = new QueueController(marvinBaseUrl);
const searchController = new SearchController(listsDirectory);

routes.get('/search', (req, res) => searchController.search(req, res));
routes.get('/queue', (req, res) => queueController.get(req, res));

export default routes;
