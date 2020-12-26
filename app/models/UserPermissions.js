import * as userPermissionsDal from '../DAL/userPermissions';

export async function createUser(settings) {
	var usersData = await userPermissionsDal.getUsers();
	if (!usersData) usersData = [];

	var { userId, permissions } = settings;
	usersData.push({ userId, permissions });
	await userPermissionsDal.writeUsers(usersData);
}

export async function getUser(userId) {
	var users = await userPermissionsDal.getUsers();
	var user = users.find(user => user.userId == userId);
	return user;
}

export async function updateUser(newPermissions, userId) {
	var users = await userPermissionsDal.getUsers();
	var user = users.find(user => user.userId == userId);
	user.permissions = newPermissions;
	await usersDal.writeUsers(users);
}

export async function deleteUser(id) {
	var users = await usersDal.getUsers();
	users = users.filter(user => user.id != id);

	usersData.users = users;
	await usersDal.writeUsers(usersData);
}
