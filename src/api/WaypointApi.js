import delay from './delay';
import ApiConfig from './ApiConfig';
import ApiHelpers from './ApiHelpers';
import $ from 'jquery';

class WaypointApi {

  static getAllWaypoints() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: ApiConfig.ApiServer + "/api/Waypoint",
        context: document.body,
        success: function(waypointList,status,xhr){
          resolve(Object.assign([], waypointList));
        }, 
        error: function(xhr,status,exception){
          reject('Ajax call for getAllWaypoints failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
        }
        
      });

    });
  }

  static saveWaypoint(waypoint) {
    waypoint = Object.assign({}, waypoint); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
        // Simulate server-side validation
        const minWaypointNameLength = 1;
        if (waypoint.name.length < minWaypointNameLength) {
          reject(`Name must be at least ${minWaypointNameLength} characters.`);
        }
        if (waypoint.waypointId) {
          $.ajax({
            method: "PUT",
            url: ApiConfig.ApiServer + "/api/Waypoint",
            data: waypoint,
            context: document.body,
            success: function(changedWaypoint,status,xhr){
              resolve(Object.assign([], changedWaypoint));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveWaypoint(update) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        } else {
          $.ajax({
            method: "POST",
            url: ApiConfig.ApiServer + "/api/Waypoint",
            data: waypoint,
            context: document.body,
            success: function(createdWaypoint,status,xhr){
              resolve(Object.assign([], createdWaypoint));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for saveWaypoint(create) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        }

    });
  }

  static deleteWaypoint(waypoint) {
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: ApiConfig.ApiServer + "/api/Waypoint/" + waypoint.waypointId,
            context: document.body,
            success: function(){
              resolve(waypoint);
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for deleteWaypoint failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
    });
  }
}

export default WaypointApi;