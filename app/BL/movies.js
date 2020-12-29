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
	var {name, genres, image, premiered} = req.body
	try {
		var movie = Subscriptions.createMovie(name, genres,image, premiered)
		res.status(200).json(movie)
	} catch (err) {
		res.status(500).end()
		next(err);
	}
}

export async function createMovie(req, res, next) {
	const { name, genres, image, premiered } = req.body;
	
	try {
		var movie = await Subscriptions.createMovie({ name, genres, image, premiered });
		res.status(200).json(movie)
	} catch (err) {
		console.log(err)
		next(err);
	}
}

export async function deleteMovie(req, res, next) {
	var {id} = req.params
	try {
		await Subscriptions.deleteMovie(id)
		res.status(200).end()
	} catch(err){
		console.log(err)
		res.status(500).end()
	}}

export async function updateMovie(req, res, next) {
	var {name, genres, image, premiered} = req.body
	var {id} = req.params
	try{
		var movie = await Subscriptions.updateMovie({id, name, genres, image, premiered})
		res.status(200).json(movie)
	} catch(err){
		res.status(500).end()
		console.log(err)
	}
}

