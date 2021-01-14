export const isLoggedIn = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		req.flash('error', 'You must be logged in to access this page');
		return res.redirect('/login');
	}
};

export const isAdmin = (req, res, next) => {
	if (req.session.user && req.session.user.isAdmin) {
		next();
	} else {
		req.flash('error', 'You must be logged as admin to access this page');
		return res.redirect('/login');
	}
};

/**Middleware */
export function isAuth(req, res, next) {
	var { user } = req.session;
	var route = { url: req.originalUrl, method: req.method };
	if (!user) {
		req.flash('error', 'You must be logged in to access this route');
		res.redirect('/login');
	} else if (!checkPermissionsToRoute(user, route)) {
		req.flash(
			'error',
			"You don't have the right permissions to access this route"
		);
		res.redirect('/');
	} else {
		return next();
	}
}

function checkPermissionsToRoute(user, currRoute) {
	if (user.permissions.isAdmin) return true;
	var requiredPermissions = [
		// Movie permissions
		{
			url: /^\/movies$/,
			method: 'GET',
			permission: {
				movies: 'view',
			},
		},
		{
			url: /^\/movies\/delete/,
			method: 'GET',
			permission: {
				movies: 'delete',
			},
		},
		{
			url: /^\/movies\/create/,
			method: 'GET',
			permission: {
				movies: 'create',
			},
		},
		{
			url: /^\/movies\/.*/,
			method: 'GET',
			permission: {
				movies: 'update',
			},
		},
		// Member permissions
		{
			url: /^\/members/,
			method: 'GET',
			permission: {
				subscriptions: 'view',
			},
		},
		{
			url: /^\/members\/delete/,
			method: 'GET',
			permission: {
				subscriptions: 'delete',
			},
		},
		{
			url: /^\/members\/create/,
			method: 'GET',
			permission: {
				subscriptions: 'create',
			},
		},
		{
			url: /^\/members\/.*/,
			method: 'GET',
			permission: {
				subscriptions: 'update',
			},
		},
		{
			url: /^\/subscriptions$/,
			method: 'POST',
			permission: {
				subscriptions: 'update'
			},
		},
		{
			url: /^\/subscriptions.*/,
			method: 'GET',
			permission: {
				movies: 'view',
			},
		},
	];

	var requiredPermission = requiredPermissions.find(requiredPermission => {
		var routeMatch = requiredPermission.url.test(currRoute.url);
		var result = routeMatch && requiredPermission.method == currRoute.method;
		return result;
	});
	if (requiredPermission) {
		var [data, permission] = Object.entries(requiredPermission.permission)[0];
		var hasPermission = user.permissions[data][permission];
		return hasPermission;
	}

	return false;
}
