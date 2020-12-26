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

export function getUser(req, res, next) {
	res.render('/user', {});
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
	//Prevent deleting the current user
	if (req.user && req.user.id != id) {
		await User.deleteUser(id);
	}

	res.redirect('/users');
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

	var user = await User.createUser({
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
		password: hashedPassword,
		isAdmin,
	});
	res.status.json(user);
}

export async function postUpdateUser(req, res, next) {
	var users = await User.getUsers();
	var { id } = req.params;
	var { username, password, transactions, isAdmin } = req.body;

	var user = users.find(user => user.id == id);

	user = { ...user, username, transactions, isAdmin };
	try {
		await User.updateUser(user);
	} catch (err) {
		console.log(err);
	}

	res.redirect('/users');
}
