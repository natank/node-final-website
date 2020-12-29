import axios from 'axios';
var subscriptionsApi = axios.create({
	// baseURL: 'https://subscription-api-4412.herokuapp.com',
	baseURL: 'http://localhost:3000'
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
		console.log("update failed")
		throw err;
	}
}

export async function updateMovie({id, name, genres, image, premiered}){
	try{
		var response = await subscriptionsApi.put(`movies/`,{_id: id, name, genres, image, premiered} )
		return response.data
	}catch(err){
		console.log("err")
		throw(err)
	}
}

export async function deleteMovie(id){
	try{
		await subscriptionsApi.delete(`/movies/${id}` )

	} catch(err){
		throw(err)
	}
}

export async function createMovie({name, genres, image, premiered}){
	try {
		var response = await subscriptionsApi.post('movies', {name, genres, image, premiered})	
		return response.data
	} catch (error) {
		throw(err)
	}
}



/**Member controller */


export async function getMembers({ name, genres }) {
	var response = await subscriptionsApi.get('/members', {
		data: { name, genres },
	});
	return response.data;
}

export async function getMember(id) {
	var response = await subscriptionsApi.get(`/members/${id}`);
	try {
		var member = response.data;
		return member;
	} catch (err) {
		console.log("update failed")
		throw err;
	}
}

export async function updateMember({id, name, email, city}){
	try{
		var response = await subscriptionsApi.put(`members/`,{_id: id, name, email, city} )
		return response.data
	}catch(err){
		console.log("err")
		throw(err)
	}
}

export async function deleteMember(id){
	try{
		await subscriptionsApi.delete(`/members/${id}` )

	} catch(err){
		throw(err)
	}
}

export async function createMember({name, email, city}){
	try {
		var response = await subscriptionsApi.post('members', {name, email, city})	
		return response.data
	} catch (error) {
		throw(err)
	}
}

