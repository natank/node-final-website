import subscriptionsApi from '../API/subscriptions';

export async function getSubscriptions({ memberId, movieId }) {
	var response = await subscriptionsApi.get('/subscriptions', {
		data: {
			memberId,
			movieId,
		},
	});
	return response.data;
}

export async function deleteSubscriptions(memberId) {
	try {
		await subscriptionsApi.delete(`/${memberId}`);
	} catch (err) {
		throw err;
	}
}

export async function createSubscription({ memberId, movieId, date }) {
	try {
		var response = await subscriptionsApi.post('/subscriptions', {
			memberId,
			movieId,
			date,
		});
		return response.data;
	} catch (error) {
		throw err;
	}
}

