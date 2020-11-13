import { Router } from 'express';
import OfficerController from '../controllers/officerController';
import SearchController from '../controllers/searchController';
const routes = Router();
routes.get('/', OfficerController.list);
routes.get('/search', SearchController.search);
routes.get('/:id', OfficerController.get);
export default routes;
