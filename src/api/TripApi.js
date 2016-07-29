import $ from 'jquery';
import ApiConfig from './ApiConfig';
import ApiHelpers from './ApiHelpers';

const trips = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (trip) => {
  return replaceAll(trip.title, ' ', '-');
};
 
class TripApi {

  static getAllTrips() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: ApiConfig.ApiServer + "/api/Trip",
        context: document.body,
        success: function(tripList,status,xhr){
          resolve(Object.assign([], tripList));
        }, 
        error: function(xhr,status,exception){
          reject('Ajax call for getAllTrips failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
        }
        
      });

    });
  }

  static saveTrip(trip) {
    trip = Object.assign({}, trip); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
        // Simulate server-side validation
        const minTripTitleLength = 1;
        if (trip.title.length < minTripTitleLength) {
          reject(`Title must be at least ${minTripTitleLength} characters.`);
        }
        if (trip.tripId) {
          $.ajax({
            method: "PUT",
            url: ApiConfig.ApiServer + "/api/Trip",
            data: trip,
            context: document.body,
            success: function(changedTrip,status,xhr){
              resolve(Object.assign([], changedTrip));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveTrip(update) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        } else {
          $.ajax({
            method: "POST",
            url: ApiConfig.ApiServer + "/api/Trip",
            data: trip,
            context: document.body,
            success: function(createdTrip,status,xhr){
              resolve(Object.assign([], createdTrip));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveTrip(create) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        }

    });
  }

  static deleteTrip(tripId) {
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: ApiConfig.ApiServer + "/api/Trip/" + tripId,
            context: document.body,
            success: function(){
              resolve(tripId);
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for deleteTrip failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
    });
  }
}

export default TripApi;