/**
* @ngDoc service
**/

function auth()  {
	var authService = {};
	authService.loggedIn = false;

	return authService;
};

/**
* Attach to angularjs
**/

angular.module('duelApp').service('auth', [
	auth
	]);
