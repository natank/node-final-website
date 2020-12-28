import * as User from '../models/User';

import bcrypt from 'bcryptjs';

export async function findUser(id) {
	var user = await User.findById(id);
	return user;
}

export async function getUsers(req, res, next) {
	var users = await User.getUsers();
	if (!users) users = [];
	res.render('./users', { users, authUser: req.user.id });
}

export async function getUser(req, res, next) {
	var userId = req.params.id;
	try {
		var user = await User.findById(userId);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export function getCreateUser(req, res, next) {
	res.render('userForm');
}

export async function getUpdateUser(req, res, next) {
	var userId = req.params.id;
	var user = await User.findById(userId);
	res.render('userForm', { user });
}

export async function deleteUser(req, res, next) {
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

export async function postCreateUser(req, res, next) {
	var {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
		password,
		isAdmin,
	} = req.body;
	let hashedPassword = await bcrypt.hash(password, 12);

	await User.createUser({
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
		password: hashedPassword,
		isAdmin,
	});

	res.status(200).end();
}

export async function postUpdateUser(req, res, next) {
	var { id } = req.params;
	var { username, firstName, lastName, sessionTimeOut, permissions } = req.body;

	try {
		await User.updateUser({
			id,
			username,
			firstName,
			lastName,
			sessionTimeOut,
			permissions,
		});
	} catch (err) {
		res.status(500).end();
		throw err;
	}
	res.status(200).end();
}
