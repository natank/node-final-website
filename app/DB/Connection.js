import mongoose from 'mongoose';

const URI = process.env.DB_URI;

export default async function connectDB() {
	mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log('db connected...!');
}
