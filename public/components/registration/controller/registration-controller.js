/**
* @ngDoc controller
**/

function registrationController($scope, LxNotificationService, $state) {
	$scope.validEmail = false;
	$scope.validUsername = false;

	$scope.registerUser = function() {
		if($scope.validEmail == false ) {
			dpd.users.post($scope.user, function(user, err) {
			  if(err) {
			  	// server checks if username is unique
			  	LxNotificationService.error(err.message);
			  }
			  if(angular.isDefined(user.id)) {
			  	auth.loggedIn = true;
			  	$state.transitionTo('dashboard');
			  }
			});
		}
	}

	$scope.uniqueEmail = function(email) {
		dpd.users.get({'email':email}, function (result) {
				console.log(result.length)
				if(result.length > 0) {
						LxNotificationService.error('Email already exists');
						$scope.validEmail = true;
				} else {
						$scope.validEmail = false;
				}
		});
	}

	// $scope.uniqueUsername = function(username) {
	// 	dpd.users.get({'username':username}, function (result) {
	// 			console.log(result.length)
	// 			if(result.length > 0) {
	// 					LxNotificationService.error('Username already exists');
	// 					$scope.validUsername = true;
	// 			} else {
	// 					$scope.validUsername = false;
	// 			}
	// 	});
	//}

};

/**
* Attach the function to angularJs
**/

angular.module('duelApp').controller('registrationController', [
	"$scope",
	"LxNotificationService",
	"$state",
	registrationController
	]);
