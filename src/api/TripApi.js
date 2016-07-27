import delay from './delay';
import $ from 'jquery';

const trips = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (trip) => {
  return replaceAll(trip.title, ' ', '-');
};
 
class TripApi {
  // TODO TZ consolidate these
  static formatErrorMessage(jqXHR, exception) {
    //http://stackoverflow.com/questions/377644/jquery-ajax-error-handling-show-custom-exception-messages
    if (jqXHR.status === 0) {
        return ('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        let jsonValue = $.parseJSON( jqXHR.responseText );
        return ('Internal Server Error [500].\r\n' + (jsonValue && jsonValue.exceptionMessage) ? jsonValue.exceptionMessage : "");
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}
  static getAllTrips() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:15989/api/Trip",
        context: document.body,
        success: function(tripList,status,xhr){
          resolve(Object.assign([], tripList));
        }, 
        error: function(xhr,status,exception){
          reject('Ajax call for getAllTrips failed - ' + TripApi.formatErrorMessage(xhr, exception));
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
            url: "http://localhost:15989/api/Trip",
            data: trip,
            context: document.body,
            success: function(changedTrip,status,xhr){
              resolve(Object.assign([], changedTrip));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveTrip(update) failed - ' + TripApi.formatErrorMessage(xhr, exception));
            }            
          });
        } else {
          $.ajax({
            method: "POST",
            url: "http://localhost:15989/api/Trip",
            data: trip,
            context: document.body,
            success: function(createdTrip,status,xhr){
              resolve(Object.assign([], createdTrip));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveTrip(create) failed - ' + TripApi.formatErrorMessage(xhr, exception));
            }            
          });
        }

    });
  }

  static deleteTrip(tripId) {
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: "http://localhost:15989/api/Trip/" + tripId,
            context: document.body,
            success: function(){
              resolve(tripId);
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for deleteTrip failed - ' + TripApi.formatErrorMessage(xhr, exception));
            }            
          });
    });
  }
}

export default TripApi;