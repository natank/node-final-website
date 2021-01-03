import axios from 'axios';
var subscriptionsApi = axios.create({
	// baseURL: 'https://subscription-api-4412.herokuapp.com',
	baseURL: 'http://localhost:3000',
});

export default subscriptionsApi;
