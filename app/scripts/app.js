(function(){
  'use strict';

  var template_base = './scripts';
  angular.module('app',
    ['ngRoute',
    'ngMaterial',
    'ngAnimate'])
    .config(['$routeProvider',  function($routeProvider){
      $routeProvider.when('/', {
        templateUrl: template_base + '/customer/customer.html',
        controller: 'customerController',
        controllerAs: '_ctrl'
      });
      $routeProvider.otherwise({redirectTo: '/'});
    }]);
})()
