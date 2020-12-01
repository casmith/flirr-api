import { Router } from 'express';
import QueueController from '../controllers/queueController';
import SearchController from '../controllers/searchController';
const routes = Router();


const marvinBaseUrl = process.env.MARVIN_BASE_URL || 'http://localhost:8081';

const queueController = new QueueController(marvinBaseUrl);

routes.get('/search', SearchController.search);
routes.get('/queue', () => queueController.get());
export default routes;
