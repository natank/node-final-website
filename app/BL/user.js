import * as User from '../models/User';
import { params, validationResult } from 'express-validator';

import bcrypt from 'bcryptjs';

export async function findUser(id) {
	var user = await User.findById(id);
	return user;
}

export async function getUsers(req, res, next) {
	var users = await User.getUsers();
	if (!users) users = [];
	users.forEach(permissionsToString);

	res.render('./users', { users });
}

export async function getActivateUser(req, res) {
	res.render('./activateAccount', {
		errorMessage: req.flash('error'),
		oldInput: {
			email: '',
			password: '',
		},
		validationErrors: [],
	});
}

export function getCreateUser(req, res) {
	res.render('userForm');
}

export async function getUpdateUser(req, res) {
	var userId = req.params.id;
	var user = await User.findById(userId);

	if (user) {
		res.render('userForm', { editedUser: user });
	} else {
		req.flash('error', 'user not found');
		res.render('/');
	}
}

export async function deleteUser(req, res) {
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
}

export async function postCreateUser(req, res) {
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
}

export async function postUpdateUser(req, res, next) {
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
		next(err);
		throw err;
	}
	res.redirect('/');
}

export async function postActivateAccount(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		var ers = errors.array();
		res.status(200).json(ers);
	} else {
		var { username, password } = req.body;
		// console.log(`password entered: ${password}`)
		let hashedPassword = await bcrypt.hash(password, 12);
		var userId = req.userToActivate.id;
		await User.updateUserPassword(userId, hashedPassword);
		res.redirect('/login');
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
