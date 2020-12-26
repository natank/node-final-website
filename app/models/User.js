import mongoose from 'mongoose';
import * as UserData from './UserData';
import * as UserPermissions from './UserPermissions';

const user = new mongoose.Schema({
	name: {
		type: String,
	},
	password: {
		type: String,
	},
});

user.post('save', function (doc) {
	console.log(`${doc._id} has been initialized from the db`);
	console.log(doc);
});

export default mongoose.model('user', user);
