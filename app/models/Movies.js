import subscriptionsApi from '../API/subscriptions';

export async function findMovies({ name, genres }) {
	var response = await subscriptionsApi.get('/movies', {
		name,
		genres,
	});
	return response.data;
}

export async function findById(movieId){
  var response = await subscriptionsApi.get(`/movies/${movieId}`)
	return response.data;
}