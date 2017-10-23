(function(){
  'use strict';

  angular.module('app')
  .controller('customerController', ['customerService', '$q', '$mdDialog', CustomerController]);

  function CustomerController(customerService, $q, $mdDialog){
    var self = this;

    self.customers = [];
    self.selected = null;
    self.selectedIndex = 0;
    self.filterText = null;
    self.selectCustomer = selectCustomer;
    self.createCustomer = createCustomer;
    self.deleteCustomer = deleteCustomer;
    self.saveCustomer = saveCustomer;
    self.filter = filterCustomer;

    getAllCustomers();

    function selectCustomer($customer, $index){
      self.selected = angular.isNumber($customer) ? self.customers[$customer]: $customer;
      self.selectedIndex = angular.isNumber($customer) ? $customer: $index;
    }

    function deleteCustomer($event){
      var confirm = $mdDialog.confirm()
                      .title('Are you sure ?')
                      .content('Are you sure want to delete this customer ?')
                      .ok('Yes')
                      .cancel('No')
                      .targetEvent($event);

      $mdDialog.show(confirm).then(function(){
        customerService.destroy(self.selected.customer_id).then(function(affectedRows){
          self.customers.splice(self.selectedIndex, 1);
        });
      }, function(err){

      });
    }

    function saveCustomer($event){
      if(self.selected != null && self.selected.customer_id != null){
        var alert = $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data updated successfully!')
                        .ok('OK')
                        .targetEvent();
        customerService.update(self.selected).then(function(affectedRows){
          $mdDialog.show(alert);
        });
      }else{
        var alert = $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data added successfully!')
                        .ok('Ok')
                        .targetEvent($event);
        customerService.create(self.selected).then(function(affectedRows){
          $mdDialog.show(alert);
        });
      }
    }

    function createCustomer(){
      self.selected = {
        customer_id: null,
        name: null,
        address: null,
        city: null,
        country: null,
        phone: null,
        remarks: null
      };
      self.selectedIndex = 0;
    }

    function  getAllCustomers(){
      customerService.getCustomers().then(function(customers){
        self.customers = [].concat(customers);
        self.selected = customers[0];
      });
    }

    function filterCustomer(){
      if(self.filterText == null || self.filterText == ''){
        getAllCustomers();
      }else{
        customerService.getByName(self.filterText).then(function(customers){
          self.customers = [].concat(customers);
          self.selected = customers[0];
        });
      }
    }
  }
})()
