import { Router } from 'express';
import imagesRouter from './images.routes';

const routes = Router();

routes.use('/', imagesRouter);

export default routes;

