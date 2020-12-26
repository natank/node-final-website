import * as usersDal from '../DAL/UserData';

export async function createUser(settings) {
	var users = await usersDal.getUsers();
	if (!users) users = [];
	var createdDate = new Date(Date.now()).toDateString();
	var user = { ...settings, createdDate };
	users.push(user);
	await usersDal.writeUsers(users);
}

export async function getUsers() {
	var users = await usersDal.getUsers();

	return users ? users : null;
}

export async function findById(id) {
	var users = await getUsers();
	var user = users.find(user => user._id == id);
	return user;
}

export async function updateUser(user) {
	var users = await usersDal.getUsers();
	var oldUser = users.find(currUser => currUser._id == user._id);
	// Update only the keys provided to the function
	Object.keys(user).forEach(key => {
		oldUser[key] = user[key];
	});

	await usersDal.writeUsers(usersData);
}

export async function deleteUser(id) {
	var usersData = await usersDal.getUsers();
	var { users, index } = usersData;
	users = users.filter(currUser => {
		var result = currUser.id != id;
		return result;
	});
	usersData.users = users;
	await usersDal.writeUsers(usersData);
}
