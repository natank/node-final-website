import mongoose from 'mongoose';

const user = new mongoose.Schema({
	name: {
		type: String,
	},
	password: {
		type: String,
	},
});

export default mongoose.model('user', user);
