import express from 'express';

// import { isLoggedIn as isAuth } from '../BL/middleware/is-auth';
import * as moviesController from '../BL/movies';

const router = express.Router();

router.get('/', moviesController.findMovies);
router.get('/delete/:id', moviesController.deleteMovie);
router.get('/create', moviesController.getMovie);
router.get('/:id', moviesController.getMovie);

router.post('/', moviesController.postCreateMovie);
router.post('/update/:id', moviesController.updateMovie);

export default router;
