(function(){
  'use strict';

  var mysql = require('mysql');
  var _ = require('lodash');

  var connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'customer_manager',
    multipleStatements: true
  });

  angular.module('app')
    .service('customerService', ['$q', CustomerService]);

  function CustomerService($q){
    return {
      getCustomers: getCustomers,
      getById:getCustomerById,
      getByName: getCustomerByName,
      create: createCustomer,
      destroy: destroyCustomer,
      update: updateCustomer
    };

    function  getCustomers(){
      var deferred = $q.defer();
      var query = "SELECT * FROM customers";
      connection.query(query, function(err, rows){
        if(err) deferred.reject(err);
        deferred.resolve(rows);
      });

      return deferred.promise;
    }

    function  getCustomerById($id){
      var deferred = $q.defer();
      var query = "SELECT * FROM customers WHERE customer_id = ?";
      connection.query(query, [$id], function(err, rows){
        if(err) deferred.reject(err);
        deferred.resolve(rows);
      });

      return deferred.promise;
    }

    function  getCustomerByName($name){
      var deferred = $q.defer();
      $name += '%';
      var query = "SELECT * FROM customers WHERE name COLLATE utf8_general_ci LIKE ?";
      connection.query(query, [$name], function(err, rows){
        if(err) deferred.reject(err);
        deferred.resolve(rows);
      });

      return deferred.promise;
    }

    function  createCustomer($customer){
      console.log($customer);
      var deferred = $q.defer();
      var query = "INSERT INTO customers SET ?";
      connection.query(query, [$customer], function(err, res){
        if(err) deferred.reject(err);
        deferred.resolve(res.insertId);
      });

      return deferred.promise;
    }

    function  destroyCustomer($id){
      var deferred = $q.defer();
      var query = "DELETE FROM customers WHERE customer_id = ?";
      connection.query(query, [$id], function(err, res){
        if(err) deferred.reject(err);
        deferred.resolve(res.affectedRows);
      });

      return deferred.promise;
    }

    function  updateCustomer($customer){
      var $customer_json = angular.toJson($customer);
      var $customer_temp = _.cloneDeep(JSON.parse($customer_json));
      //console.log(angular.copy($customer));
      if(_.hasIn($customer_temp, 'customer_id')){
        var $customer_id = $customer_temp.customer_id;
        _.unset($customer_temp, 'customer_id');
        var $size = _.size($customer_temp);
        var $update = _.reduce($customer_temp, function($result, $value, $key){
          if($key === undefined || $key === '' || $key === null)
            return $result;
          if($size > 1)
            $result += $key + " = " + mysql.escape($value) + ", ";
          else {
            $result += $key + " = " + mysql.escape($value);
          }
          $size--;
          return $result;
        }, '');
      }
      var deferred = $q.defer();
      var query = "UPDATE customers SET " + $update + "  WHERE customer_id = ?";
      connection.query(query, [$customer_id], function(err, res){
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });

      return deferred.promise;
    }
  }
})();
