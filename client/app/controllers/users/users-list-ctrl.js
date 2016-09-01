'use strict';

angular.module('app').controller('UsersListCtrl',
  function($scope, $uibModal, $location, Notifier, User) {

  $scope.isLoading = true;

  (function loadData() {
    User
      .query()
      .$promise
      .then(function(users) {
        $scope.users = users;
        $scope.isLoading = false;
      });
  })();

  $scope.userDetails = function(user) {
    $location.path('/users/' + user._id);
  };

  $scope.editUser = function(user) {
    $location.path('/users/' + user._id + '/edit');
  };

  $scope.deleteUser = function(user) {
    $scope.isSaving = true;
    $uibModal.open({
      templateUrl: 'views/common/confirmation-dialog.html',
      controller: 'ModalCtrl',
      resolve: {
        items: function() {
          return {
            title: 'Delete ' + user.name + '?',
            message: user.name + ' will be permanently deleted.'
          };
        }
      }
    })
    .result
    .then(function() {
      return user.$remove({ id: user._id });
    })
    .then(function() {
      _.remove($scope.users, user);
      Notifier.info('User deleted successfully');
    })
    .catch(function(err) {
      if (err !== 'cancel') {
        Notifier.error(err, 'Unable to delete user');
      }
    })
    .finally(function() {
      $scope.isSaving = false;
    });
  };
});
