import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const waypoints = [
    {
      "latitude": 43.905967197,
      "longitude": -88.428131393,
      "waypointId": 1,
      "dateTime": "2016-07-07T18:49:39",
      "description": "WP004",
      "name": "WP004",
      "depth": 0,
      "type": 0,
      "visible": false
    },
    {
      "latitude": 43.905967197,
      "longitude": -88.428131393,
      "waypointId": 2,
      "dateTime": "2016-07-07T18:49:39",
      "description": "WP004",
      "name": "WP004",
      "depth": 0,
      "type": 0,
      "visible": false
    },
    {
      "latitude": 43.905967197,
      "longitude": -88.428131393,
      "waypointId": 3,
      "dateTime": "2016-07-07T18:49:39",
      "description": "TESTER",
      "name": "TESTER",
      "depth": 0,
      "type": 0,
      "visible": false
    }    
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (waypoint) => {
  return replaceAll(waypoint.name, ' ', '-');
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
        const minWaypointNameLength = 1;
        if (waypoint.name.length < minWaypointNameLength) {
          reject(`Name must be at least ${minWaypointTitleLength} characters.`);
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
    alert('deleteWaypoint');
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