import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const waypoints = 
[
  {
    "latitude": 43.905967197,
    "longitude": -88.428131393,
    "waypointId": 88,
    "dateTime": "2016-07-07T18:49:39",
    "description": "DEFAULT WAYPOINT",
    "name": "DEFAULT WAYPOINT",
    "depth": 0,
    "type": 0,
    "visible": false,
    "tripId": 1,
    "waypointFileId": 1,
    "createdBy": "default",
    "createdDate": "2016-08-04T13:17:05.873",
    "modifiedBy": "default",
    "modifiedDate": "2016-08-04T13:17:05.873"
  },
  {
    "latitude": 44.905967197,
    "longitude": -89.428131393,
    "waypointId": 89,
    "dateTime": "2016-07-07T18:49:39",
    "description": "DEFAULT WAYPOINT",
    "name": "DEFAULT WAYPOINT",
    "depth": 0,
    "type": 0,
    "visible": false,
    "tripId": 1,
    "waypointFileId": 1,
    "createdBy": "default",
    "createdDate": "2016-08-04T13:18:09.5",
    "modifiedBy": "default",
    "modifiedDate": "2016-08-04T13:18:09.5"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (waypoint) => {
  let maxWaypointId = 0;
  for(let i = 0; i<waypoints.length; i++)
  {
    maxWaypointId = Math.max(maxWaypointId, waypoints[i].waypointId);
  }
  return maxWaypointId+1;
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
          reject(`Name must be at least ${minWaypointNameLength} characters.`);
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