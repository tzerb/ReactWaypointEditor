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

  static getAllWaypoints() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:15989/api/Waypoint",
        context: document.body
      }).success(function(waypointList) {
        resolve(Object.assign([], waypointList));
      }).fail(function() {
        reject('Ajax call for getAllWaypoints failed');
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
            context: document.body
          }).success(function(waypoint) {
            resolve(Object.assign([], waypoint));
          }).fail(function() {
            reject('Ajax call for getAllWaypoints failed');
          });
        } else {
          $.ajax({
            method: "POST",
            url: "http://localhost:15989/api/Waypoint",
            data: waypoint,
            context: document.body
          }).success(function(waypoint) {
            resolve(Object.assign([], waypoint));
          }).fail(function() {
            reject('Ajax call for getAllWaypoints failed');
          });
        }

    });
  }

  static deleteWaypoint(waypointId) {
    alert('deleteWaypoint');
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: "http://localhost:15989/api/Waypoint/" + waypointId,
            context: document.body
          }).success(function() {
            resolve();
          }).fail(function() {
            reject('Ajax call for getAllWaypoints failed');
          });
    });
  }
}

export default WaypointApi;