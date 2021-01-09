import * as Movie from '../models/Movies';

export async function findMovies(req, res, next) {
	var { name, genres } = req.query;
	try {
		var movies = await Movie.findMovies({ name, genres });
		res.render('./movies', { movies });
	} catch (err) {
		console.log(err);
		req.flash('error', `can't load movies`);
		res.redirect('/');
	}
}

export async function getMovie(req, res, next) {
	try {
		const movieId = req.params.id;
		var movie = movieId ? await Movie.findById(movieId) : undefined;
		res.render('./movieForm', { movie });
	} catch (err) {
		req.flash('error', 'movie not found');
		res.redirect('/movies');
		throw err;
	}
}

export async function postCreateMovie(req, res, next) {
	const { name, genres, image, premiered } = req.body;

	try {
		var movie = await Movie.createMovie({
			name,
			genres,
			image,
			premiered,
		});
		res.redirect('./movies');
	} catch (err) {
		console.log(err);
		next(err);
	}
}

export async function deleteMovie(req, res, next) {
	var { id } = req.params;
	try {
		await Movie.deleteMovie(id);
		res.redirect('/movies');
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
}

export async function updateMovie(req, res, next) {
	var { name, genres, image, premiered } = req.body;
	var { id } = req.params;
	try {
		var movie = await Movie.updateMovie({
			id,
			name,
			genres,
			image,
			premiered,
		});
		res.redirect('/movies');
	} catch (err) {
		res.status(500).end();
		console.log(err);
	}
}
