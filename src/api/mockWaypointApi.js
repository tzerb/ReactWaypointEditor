import delay from './delay';

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
    //alert('getAllWaypoints');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], waypoints));
      }, delay);
    });
  }

  static saveWaypoint(waypoint) {
    waypoint = Object.assign({}, waypoint); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minWaypointTitleLength = 1;
        if (waypoint.title.length < minWaypointTitleLength) {
          reject(`Title must be at least ${minWaypointTitleLength} characters.`);
        }
        if (waypoint.waypointId) {
          const existingWaypointIndex = waypoints.findIndex(a => a.waypointId == waypoint.waypointId);
          waypoints.splice(existingWaypointIndex, 1, waypoint);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new waypoints in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          waypoint.waypointId = generateId(waypoint);
          waypoints.push(waypoint);
        }

        resolve(waypoint);
      }, delay);
    });
  }

  static deleteWaypoint(waypointId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfWaypointToDelete = waypoints.findIndex(waypoint => {
          waypoint.waypointId == waypointId;
        });
        waypoints.splice(indexOfWaypointToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default WaypointApi;