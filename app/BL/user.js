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
	res.render('userForm', { editedUser: user });
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

	res.status(200).end();
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
		let hashedPassword = await bcrypt.hash(password, 12);
		var userId = req.userToActivate.id;
		await User.updateUserPassword(userId, hashedPassword);
		res.status(200).end();
	}
}
