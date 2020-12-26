export async function getMovies(req, res, next) {
	var { name, language, genre } = req.query;
	try {
		const movies = undefined;
		const allGenres = undefined;
		res.render('./movies', {
			genres: allGenres,
			movies,
		});
	} catch (err) {
		next(err);
	}
}

export async function getMovie(req, res, next) {
	try {
		const movie = undefined;

		res.render('./movie', { movie });
	} catch (err) {
		next(err);
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

export async function postCreateMovie(req, res, next) {
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
