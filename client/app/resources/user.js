'use strict';

angular.module('app').factory('User', function($resource) {
  return $resource('/api/users/:id', 
    { id: '@_id' },
    {
      update: {
        method: 'PUT'
      }
    });
});
