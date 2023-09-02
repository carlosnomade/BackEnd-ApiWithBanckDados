import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionContoller from './app/controllers/SessionContoller';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';

import authMiddleware from './app/middlewares/auth';
import OrderController from './app/controllers/OrderController';

const upload = multer(multerConfig);
const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionContoller.store);

routes.use(authMiddleware);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/order', OrderController.store);

export default routes;
