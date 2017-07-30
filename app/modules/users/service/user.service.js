'use strict';

angular.module('app.user').service('UserService', ['$http',
  function($http) {

    /**
     * Returns a JSON array of all of the users
     * @returns {*} JSON array of users
     */
    this.getAllUsers = function () {
      return $http.get('http://jsonplaceholder.typicode.com/users');
    };

    /**
     * Returns the user object given an id
     * @param id the user id
     * @returns {*} return the user
     */
    this.getUserById = function(id){
      return $http.get('http://jsonplaceholder.typicode.com/users/' + id);
    };

    /**
     * Will return a JSON array of the location given the geo location
     * @param lat latitude
     * @param lng longitude
     * @returns {*} JSON array of the location
     */
    this.getUserAddressByGeo = function(lat, lng){
      var parsedLat = (parseInt(lat* 10000))/10000;
      var parsedLng =(parseInt(lng* 10000))/10000;
      var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + parsedLat + ',' + parsedLng;
      return $http.get(url);
    };

    /**
     * Return a JSON array of the location given the zipcode
     * @param zipcode the zip
     * @returns {*} a JSON array of the location
     */
    this.getUserAddressByZip = function(zipcode){
      var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode.substr(0, 5);
      return $http.get(url);
    };

    /**
     * Return the state given a google JSON address
     * @param address Google's JSON object
     * @returns {string} the state component of the address
     */
    this.getStateFromAddress = function(address){
      var address_components = address.address_components;
      var state = '';
      $.each(address_components, function(index, component){
        var types = component.types;
        $.each(types, function(index, type){
          if(type === 'administrative_area_level_1') {
            state = component.long_name;
          }
        });
      });
      return state;
    };
  }]);