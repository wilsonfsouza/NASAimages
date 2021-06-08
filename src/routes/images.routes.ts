import { Router } from 'express';
import ImagesController from '../controllers/ImagesController';

const imagesRouter = Router();

const imagesController = new ImagesController();

imagesRouter.get('/images', imagesController.index);

export default imagesRouter;