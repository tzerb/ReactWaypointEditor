import delay from './delay';
import $ from 'jquery';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const waypoints = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (waypoint) => {
  return replaceAll(waypoint.title, ' ', '-');
};

class WaypointApi {

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
  static getAllWaypoints() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:15989/api/Waypoint",
        context: document.body,
        success: function(waypointList,status,xhr){
          resolve(Object.assign([], waypointList));
        }, 
        error: function(xhr,status,exception){
          reject('Ajax call for getAllWaypoints failed - ' + WaypointApi.formatErrorMessage(xhr, exception));
        }
        
      });

    });
  }

  static saveWaypoint(waypoint) {
    waypoint = Object.assign({}, waypoint); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
        // Simulate server-side validation
        const minWaypointTitleLength = 1;
        if (waypoint.name.length < minWaypointTitleLength) {
          reject(`Title must be at least ${minWaypointTitleLength} characters.`);
        }
        if (waypoint.waypointId) {
          $.ajax({
            method: "PUT",
            url: "http://localhost:15989/api/Waypoint",
            data: waypoint,
            context: document.body,
            success: function(changedWaypoint,status,xhr){
              resolve(Object.assign([], changedWaypoint));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveWaypoint(update) failed - ' + WaypointApi.formatErrorMessage(xhr, exception));
            }            
          });
        } else {
          $.ajax({
            method: "POST",
            url: "http://localhost:15989/api/Waypoint",
            data: waypoint,
            context: document.body,
            success: function(createdWaypoint,status,xhr){
              resolve(Object.assign([], createdWaypoint));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveWaypoint(create) failed - ' + WaypointApi.formatErrorMessage(xhr, exception));
            }            
          });
        }

    });
  }

  static deleteWaypoint(waypointId) {
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: "http://localhost:15989/api/Waypoint/" + waypointId,
            context: document.body,
            success: function(){
              resolve();
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for deleteWaypoint failed - ' + WaypointApi.formatErrorMessage(xhr, exception));
            }            
          });
    });
  }
}

export default WaypointApi;