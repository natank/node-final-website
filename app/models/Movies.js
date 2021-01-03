import subscriptionsApi from '../API/subscriptions';

export async function findMovies({ name, genres }) {
	var response = await subscriptionsApi.get('/movies', {
		name,
		genres,
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

/**Member controller */

export async function getMembers({ name, genres }) {
	var response = await subscriptionsApi.get('/members', {
		data: { name, genres },
	});
	return response.data;
}

export async function getMember(id) {
	var response = await subscriptionsApi.get(`/members/${id}`);
	try {
		var member = response.data;
		return member;
	} catch (err) {
		console.log('update failed');
		throw err;
	}
}

export async function updateMember({ id, name, email, city }) {
	try {
		var response = await subscriptionsApi.put(`members/`, {
			_id: id,
			name,
			email,
			city,
		});
		return response.data;
	} catch (err) {
		console.log('err');
		throw err;
	}
}

export async function deleteMember(id) {
	try {
		await subscriptionsApi.delete(`/members/${id}`);
	} catch (err) {
		throw err;
	}
}

export async function createMember({ name, email, city }) {
	try {
		var response = await subscriptionsApi.post('members', {
			name,
			email,
			city,
		});
		return response.data;
	} catch (error) {
		throw err;
	}
}
