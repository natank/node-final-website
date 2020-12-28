import * as Subscriptions from '../models/Subscriptions';

export async function getMovies(req, res, next) {
	var { name, genres } = req.query;
	try {
		var movies = await Subscriptions.getMovies({ name, genres });
		res.status(200).json(movies);
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export async function getMovie(req, res, next) {
	try {
		const movieId = req.params.id;
		var movie = await Subscriptions.getMovie(movieId);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export async function getCreateMovie(req, res, next) {
	try {
		var genres = undefined;
		res.render('movieForm', {
			genres,
			renderAs: 'new',
		});
	} catch (err) {
		next(err);
	}
}

export async function createMovie(req, res, next) {
	const { name, language, genres } = req.body;
	var isMultiSelect = Array.isArray(genres);
	var sanitizedGenres = isMultiSelect ? genres : [genres];
	try {
		await Movie.createMovie({ name, language, genres: sanitizedGenres });
		res.render('./menu');
	} catch (err) {
		next(err);
	}
}

export async function deleteMovie(req, res, next) {}

export async function updateMovie(req, res, next) {}
