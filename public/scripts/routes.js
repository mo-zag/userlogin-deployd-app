angular.module('duelApp').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('register', {
      url: "/register",
      templateUrl: "components/registration/template/register.html",
      controller: "registrationController"
    })
    .state('login', {
      url: "/login",
      templateUrl: "components/login/template/login.html",
      controller: "loginController"
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "components/dashboard/templates/dashboard.html",
      controller:"dashboardController"
    })    
});