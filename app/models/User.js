import userCredentials from './userCredentials';
import * as userPermissions from './UserPermissions';
import * as userData from './UserData';

export async function createUser(settings) {
	var {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
		password,
	} = settings;

	var userId;

	var userCredentials = new userCredentials({ username, password });
	try {
		userCredentials = await userCredentials.save();
	} catch (err) {
		throw err;
	}

	userId = userCredentials._id.toString();

	// var { userId, permissions } = settings;
	var settings = { userId, permissions };
	await userPermissions.createUser(settings);
	settings = { userId, firstName, lastName, sessionTimeOut, createdDate };
	await userData.createUser(settings);
}

export async function updateUser(settings) {
	var {
		id,
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
	} = settings;

	await userPermissions.updateUser(id, permissions);
	await userData.updateUser(id, {
		username,
		firstName,
		lastName,
		sessionTimeOut,
	});
}

export async function findById(userId) {
	var credentials = await userCredentials.findById(userId);
	var { username } = credentials;
	var permissions = await userPermissions.findById(userId);
	var data = await userData.findById(userId);
	var { firstName, lastName, sessionTimeOut, createdDate } = data;
	var user = {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		createdDate,
		permissions,
		userId,
	};
	return user;
}

export async function deleteUser(userId) {
	try {
		await userCredentials.deleteOne({ _id: userId });
		await userPermissions.deleteUser(userId);
		await userData.deleteUser(userId);
	} catch (err) {
		console.log(err);
		throw err;
	}
}
