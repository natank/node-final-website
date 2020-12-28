import axios from 'axios';
var subscriptionsApi = axios.create({
	baseURL: 'https://subscription-api-4412.herokuapp.com',
});

export async function getMovies({ name, genres }) {
	var response = await subscriptionsApi.get('/movies', {
		data: { name, genres },
	});
	return response.data;
}

export async function getMovie(id) {
	var response = await subscriptionsApi.get(`/movies/${id}`);
	try {
		var movie = response.data;
		return movie;
	} catch (err) {
		throw err;
	}
}
