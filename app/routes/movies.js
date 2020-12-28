import express from 'express';

// import { isLoggedIn as isAuth } from '../BL/middleware/is-auth';
import * as moviesController from '../BL/movies';

const router = express.Router();

router.get('/', moviesController.getMovies);

router.get('/:id', moviesController.getMovie);
router.post('/:id', moviesController.createMovie);
router.delete('/:id', moviesController.deleteMovie);
router.put('/:id', moviesController.updateMovie);

export default router;
