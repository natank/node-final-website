import axios from 'axios';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', event => {
	let deleteUserBtn = document.querySelector('#deleteUser');
	let updateUserBtn = document.querySelector('#updateUser');
	let deleteMovieBtns = document.querySelectorAll('[data-movie-op="delete"]');
	let editMovieBtns = document.querySelectorAll('[data-movie-op="edit"]');
	let updateMovieBtn = document.querySelector('[data-movie-op="update"]')

	deleteUserBtn && deleteUserBtn.addEventListener('click', deleteUser);
	updateUserBtn && updateUserBtn.addEventListener('click', updateUser);
	deleteMovieBtns && deleteMovieBtns.forEach(btn=>btn.addEventListener('click', deleteMovie));
	editMovieBtns && editMovieBtns.forEach(btn=>btn.addEventListener('click', editMovie));
	updateMovieBtn && updateMovieBtn.addEventListener('click', updateMovie)
});

async function deleteUser(event) {
	var userId = event.target.attributes.userid.value;

	await axios.delete(`/users/${userId}`);
}

async function updateUser(event) {
	var userId = document.querySelector('#userid');
	userId = userId.value;
	var username = document.querySelector('#username').value;
	var firstName = document.querySelector('#firstName').value;
	var lastName = document.querySelector('#lastName').value;
	var sessionTimeOut = document.querySelector('#sessionTimeOut').value;
	var permissions = document.querySelectorAll('input[name="permissions"]');
	try {
		var acc = [];
		permissions = permissions.forEach(permission => {
			permission.checked ? acc.push(permission.id) : null;
		});
		permissions = acc;
	} catch (error) {
		console.log(error);
	}

	axios.put(`/users/${userId}`, {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
	});
}


/**
 * Movie Event listeneres
 */
async function editMovie(event){
	const movieId = event.target.attributes["data-movie-id"].value
	
	await axios.get(`/movies/${movieId}`)

}

async function deleteMovie(event){
	event.preventDefault();
	const movieId = event.target.attributes["data-movie-id"].value
}

async function updateMovie(event){
	
	const movieId = event.target.attributes['data-movie-id'].value
	const movieName = document.querySelector("[name='name']").value
	const movieGenres = document.querySelector("[name='genres']").value
	const movieImage = document.querySelector("[name='image']").value
	const moviePremiered = document.querySelector("[name='premiered']").value
	await axios.put('/movies', {id: movieId, name: movieName, genres: movieGenres, premiered: moviePremiered, image: movieImage})
}


function permissionToString(permission) {
	var permissions = {
		viewMovies: 'View Movies',
		createMovies: 'Create Movies',
		deleteMovies: 'Delete Movies',
		updateMovies: 'Update Movies',
		viewSubscriptions: 'View Subscriptions',
		createSubscriptions: 'Create Subscriptions',
		deleteSubscriptions: 'Delete Subscriptions',
		updateSubscriptions: 'Update Subscriptions',
	};
	return permissions[permission];
}
