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
	} = settings;
	
	var userId;

	var userCredentials = new UserCredentials({ username, password });
	try {
		userCredentials = await userCredentials.save();
	} catch (err) {
		throw err;
	}

	userId = userCredentials._id.toString();

	// var { userId, permissions } = settings;
	var settings = {userId, permissions}
	await userPermissions.createUser(settings)
	settings = {userId,firstName, lastName, sessionTimeOut }
	await userData.createUser(settings)
}


export async function updateUser(settings){
	var {
		id,
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions
	} = settings;
	
	await userPermissions.updateUser(permissions, id)


}