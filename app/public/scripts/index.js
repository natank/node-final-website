import axios from 'axios';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', event => {
	let deleteBtn = document.querySelector('#deleteUser');
	let updateBtn = document.querySelector('#updateUser');
	deleteBtn && deleteBtn.addEventListener('click', deleteUser);
	updateBtn && updateBtn.addEventListener('click', updateUser);
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
