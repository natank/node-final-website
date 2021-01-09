import axios from 'axios';

document.addEventListener('DOMContentLoaded', event => {
	let deleteUserBtn = document.querySelector('#deleteUser');
	let updateUserBtn = document.querySelector('#updateUser');
	let btnSubscriptionFormShow = document.querySelectorAll(
		'[role="showSubscriptionForm"]'
	);
	let btnSubscription = document.querySelectorAll(
		'[data-role="createSubscription"]'
	);
	let btnCancelSubscription = document.querySelectorAll(
		'[data-role="cancelSubscription"]'
	);

	btnSubscription.forEach(btn =>
		btn.addEventListener('click', createSubscription)
	);
	btnCancelSubscription.forEach(btn =>
		btn.addEventListener('click', cancelSubscription)
	);

	btnSubscriptionFormShow &&
		btnSubscriptionFormShow.forEach(btn =>
			btn.addEventListener('click', openSubscriptionForm)
		);

	deleteUserBtn && deleteUserBtn.addEventListener('click', deleteUser);
	updateUserBtn && updateUserBtn.addEventListener('click', updateUser);
});

async function deleteUser(event) {
	var userId = event.target.attributes.userid.value;

	await axios.delete(`/users/${userId}`);
}

async function updateUser(event) {
	var userId = document.querySelector('#userid');
	userId = userId.value;
	var username = document.querySelector('#username').value;
	var firstName = document.querySelector('#firstName').value;
	var lastName = document.querySelector('#lastName').value;
	var sessionTimeOut = document.querySelector('#sessionTimeOut').value;
	var permissions = document.querySelectorAll('input[name="permissions"]');
	try {
		var acc = [];
		permissions = permissions.forEach(permission => {
			permission.checked ? acc.push(permission.id) : null;
		});
		permissions = acc;
	} catch (error) {
		console.log(error);
	}

	axios.put(`/users/${userId}`, {
		username,
		firstName,
		lastName,
		sessionTimeOut,
		permissions,
	});
}

/**
 * Movie Event listeneres
 */

function openSubscriptionForm(event) {
	var btnOpenForm = event.target;
	var memberId = btnOpenForm.attributes['data-memberid'].value;
	var subscriptionForm = btnOpenForm.nextElementSibling;
	subscriptionForm.style.display =
		subscriptionForm.style.display == 'none' ? 'block' : 'none';
}

async function createSubscription(event) {
	var memberCard = event.target.closest('[data-role="memberCard"]');
	try {
		if (!memberCard) throw 'member not exist';
	} catch (error) {
		alert('the operation cannot be completed');
		console.log(error);
	}
	var memberId = memberCard.attributes['data-memberid'];
	memberId = memberId.value;
	var select = memberCard.querySelector('[data-role="movieSelect"]');
	var selectedMovieId = select.value;
	var date = memberCard.querySelector('[data-role="movieDate"]').value;
	var subscriptionsList = memberCard.querySelector(
		'[data-role="subscriptions"]'
	);
	var response = await axios.post('/subscriptions', {
		memberId,
		movieId: selectedMovieId,
		date,
	});
	var subscriptions = await axios.get('/subscriptions', {
		params: { memberId },
	});

	subscriptions = subscriptions.data;
	var subscriptionsMarkup = `
    <div class="list-group">
      ${subscriptions
				.reduce((acc, subscription) => {
					var movie = subscription.movie;
					var href = `/movies/${movie._id}`;

					acc = acc.concat(`
            <a class="list-group-item list-group-item-action" href=${href}>
              ${movie.name}, ${subscription.date}
            </a>
          `);
					return acc;
				}, '')
				.toString()}
    </div>

  `;
	subscriptionsList && (subscriptionsList.innerHTML = subscriptionsMarkup);
}

function cancelSubscription(event) {}
