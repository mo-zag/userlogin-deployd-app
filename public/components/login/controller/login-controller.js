/**
* @ngDoc controller
**/

function loginController($scope, $state, LxNotificationService, auth) {
	
	$scope.loginUser = function() {
		if(angular.isDefined($scope.users.username) && angular.isDefined($scope.users.password)) {
			dpd.users.login({"username": $scope.users.username, "password": $scope.users.password}, function(user, err) {
			  // if error show erro message
			  if(err) {
			  	 LxNotificationService.error(err.message);
			  }
			  // if success then allow user to enter app
			  if(angular.isDefined(user.id)) {
			  	auth.loggedIn = true;
			  	auth.userId = user.id;
			  	$state.transitionTo('dashboard');
			  }
			});			
		}
	}

};

/**
* Attach the function to angularJs
**/

angular.module('duelApp').controller('loginController', [
	"$scope",
	"$state",
	"LxNotificationService",
	"auth",
	loginController
	]);
