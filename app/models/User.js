import userCredentials from './UserCredentials';
import * as userPermissions from './UserPermissions';
import * as userData from './UserData';
import UserCredentials from './UserCredentials';

export async function createUser(settings) {
	var {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
		password,
		isAdmin,
	} = settings;

	var userCredentials = new UserCredentials({ username, password });
	try {
		userCredentials = await userCredentials.save();
	} catch (err) {
		throw err;
	}
	console.log(userCredentials);
}
