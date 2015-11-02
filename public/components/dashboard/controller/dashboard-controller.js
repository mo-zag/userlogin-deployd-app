/**
* @ngDoc controller
**/

function dashboardController($scope, auth, LxNotificationService) {
	$scope.selects = {
	    selectedPerson: undefined,
	    selectedPersons: [],
	    selectedPersons2: []
	};

	$scope.friendsListFromServer = [];

	$scope.init = function() {
		$scope.getFriends();
		$scope.friendsUsername();
	}

	$scope.getFriends = function() {
		dpd.friends.get({"userId":auth.userId}, function(result, err) {
		  if(err) return console.log(err);
		  $scope.friendsListFromServer = result;
		});			
	}
	$scope.friendsUsername = function(username) {
		dpd.users.get(function (result) {
			$scope.findFriends = result;
		});
	}

	$scope.addFriends = function(addFriends) {
		console.log(addFriends);
		for(var i=0; i < addFriends.length; i++) {
			dpd.friends.post({"userId":auth.userId,"friends":addFriends[i]}, function(result, err) {
			  if(err) {
			  	LxNotificationService.error(err.message);
			  }
			  if(angular.isDefined(result.id)) {
			  	 LxNotificationService.notify('You have aded a new '+ addFriends[i].fullname);
			  }
			  
			});			
		}
	}

	$scope.deleteFriend = function(id) {
		dpd.friends.del(id, function (err) {
		  if(err) {
		  	 LxNotificationService.error(err.message);
		  } else {
		  	$scope.getFriends();
		  }
		});
	}

	$scope.init();
};

/**
* Attach to angularjs
**/

angular.module('duelApp').controller('dashboardController', [
	"$scope",
	"auth",
	"LxNotificationService",
	dashboardController
	]);