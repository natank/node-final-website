import * as User from '../models/User';
import { params, validationResult } from 'express-validator';

import bcrypt from 'bcryptjs';

var customError = "An error occured please try again later"

export async function findUser(id) {
	var user = await User.findById(id);
	return user;
}

export async function getUsers(req, res, next) {
	try {
		var users = await User.getUsers();
		if (!users) users = [];
		users.forEach(permissionsToString);
	} catch (error) {
		handleError(req, error)
		return res.redirect('/')
	}

	res.render('./users', { users });
}

export async function getActivateUser(req, res) {
	try {
		res.render('./activateAccount', {
			errorMessage: req.flash('error'),
			oldInput: {
				email: '',
				password: '',
			},
			validationErrors: [],
		});		
	} catch (error) {
		handleError(req, customError, error)
		res.redirect('/login')
	}

}

export function getCreateUser(req, res) {
	res.render('userForm', {errorMessage: req.flash('error')});
}

export async function getUpdateUser(req, res) {
	try {
		var userId = req.params.id;
		var user = await User.findById(userId);

		if (user) {
			res.render('userForm', { editedUser: user });
		} else {
			req.flash('error', 'user not found');
			res.render('/');
		}		
	} catch (error) {
		console.log(error.message)
		req.flash('error', 'Something went wrong');
		handleError(req, customError, error.message)
		res.redirect('/users')
	}

}

export async function deleteUser(req, res) {
	try {
		var { id } = req.params;
		req.user = { id: 1 };
		//Prevent deleting the current user
		if (req.user && req.user.id != id) {
			try {
				await User.deleteUser(id);
				res.status(200).end();
			} catch (err) {
				res.status(500).end();
				throw err;
			}
		} else {
			res.status(204).end();
		}		
	} catch (error) {
		handleError(req, customError, error.message)
		res.status(500).end()
	}

}

export async function postCreateUser(req, res) {
	try {
		var keys = [
			'username',
			'firstName',
			'lastName',
			'sessionTimeOut',
			'permissions',
			'isAdmin',
		];
		var userSettings = {};
		keys.forEach(key => (userSettings[key] = req.body[key]));
	
		await User.createUser(userSettings);
	
		res.redirect('/');	
	} catch (error) {
		handleError(req, error)
		res.redirect('/users')
		
	}
	
}

export async function postUpdateUser(req, res, next) {
	try {
		var { id } = req.params;
		var { username, firstName, lastName, sessionTimeOut, permissions } = req.body;
	
		try {
			await User.updateUser({
				id,
				firstName,
				lastName,
				sessionTimeOut,
				permissions,
			});
		} catch (err) {
			throw err;
		}
		res.redirect('/');		
	} catch (error) {
		handleError(req, error)
		res.redirect('/users')
	}

}

export async function postActivateAccount(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			var ers = errors.array();
			req.flash('error', ers[0].msg)
			res.redirect('/users/activate');
		} else {
			var { username, password } = req.body;
			// console.log(`password entered: ${password}`)
			let hashedPassword = await bcrypt.hash(password, 12);
			var userId = req.userToActivate.id;
			await User.updateUserPassword(userId, hashedPassword);
			res.redirect('/login');
		}	
	} catch (error) {
		handleError(req, error)
		res.redirect('/login')
		
	}
	
}

function permissionsToString(user) {
	var permissions = [];
	for (const [key, value] of Object.entries(user.permissions.movies)) {
		switch (key) {
			case 'view':
				if (value == true) permissions.push('View Movies');
				break;
			case 'create':
				if (value == true) permissions.push('Create Movies');
				break;
			case 'delete':
				if (value == true) permissions.push('Delete Movies');
				break;
			case 'update':
				if (value == true) permissions.push('Update Movies');
				break;
			default:
				break;
		}
	}
	for (const [key, value] of Object.entries(user.permissions.subscriptions)) {
		switch (key) {
			case 'view':
				if (value == true) permissions.push('View Subscriptions');
				break;
			case 'create':
				if (value == true) permissions.push('Create Subscriptions');
				break;
			case 'delete':
				if (value == true) permissions.push('Delete Subscriptions');
				break;
			case 'update':
				if (value == true) permissions.push('Update Subscriptions');
				break;
			default:
				break;
		}
	}
	user.permissions.isAdmin ? permissions.push('Admin') : null;
	user.permissions = permissions;
}


function handleError(req, customError, error){
	console.log(error)
	req.flash('error', customError)
}

function generateError(){
	throw new Error("Test error")
}