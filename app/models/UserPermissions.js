import * as usersDal from '../DAL/userPermissions';

export async function createUser(settings) {
	var usersData = await usersDal.getUsers();
	if (!usersData) usersData = [];

	var { userId, permissions } = settings;
	usersData.push({ userId, permissions });
	await usersDal.writeUsers(usersData);
}

export async function findById(userId) {
	var users = await usersDal.getUsers();
	var user = users.find(user => user.userId == userId);
	return user.permissions;
}

export async function updateUser(userId, newPermissions) {
	var users = await usersDal.getUsers();
	var user = users.find(user => user.userId == userId);
	user.permissions = newPermissions;
	await usersDal.writeUsers(users);
}

export async function deleteUser(id) {
	var users = await usersDal.getUsers();
	users = users.filter(user => user.userId != id);

	await usersDal.writeUsers(users);
}
