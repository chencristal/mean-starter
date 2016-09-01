'use strict';

angular.module('app').controller('UserDetailsCtrl',
  function($scope, $location, $routeParams, User, Notifier) {

  $scope.isLoading = true;

  User
    .get({ id : $routeParams._id })
    .$promise
    .then(function(user) {
      $scope.user = user;
      $scope.isLoading = false;
    })
    .catch(function(err) {
      Notifier.error(err, 'Unable to load record');
      $location.path('/users');
    });
});
