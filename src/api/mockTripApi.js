import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const trips = 
[
  {
    "tripId": 1,
    "title": "Trip Title",
    "description": "07/07/2016",
    "dateTime": "2016-07-07T00:00:00",
    "tracks": [],
    "waypoints": [
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
    ],
    "pictures": [
      {
        "pictureId": 11,
        "name": "IMG_0319 - Copy.JPG",
        "description": "IMG_0319 - Copy.JPG",
        "dateTime": "2016-07-07T00:00:00",
        "latitude": 43.9547805555556,
        "longitude": -88.6805638888889,
        "imageBytes": "",
        "tripId": 1,
        "createdBy": "default",
        "createdDate": "2016-07-30T12:24:46.677",
        "modifiedBy": "default",
        "modifiedDate": "2016-08-01T17:07:25.197"
      },
      {
        "pictureId": 13,
        "name": "IMG_0319 - Copy (2).JPG",
        "description": "IMG_0319 - Copy (2).JPG",
        "dateTime": "2016-07-07T17:34:21",
        "latitude": 43.9547805555556,
        "longitude": -88.6805638888889,
        "imageBytes": "",
        "tripId": 1,
        "createdBy": "default",
        "createdDate": "2016-07-30T22:22:35.063",
        "modifiedBy": "default",
        "modifiedDate": "2016-07-30T22:22:35.063"
      }
    ],
    "createdBy": "default",
    "createdDate": "2016-07-30T10:49:15.417",
    "modifiedBy": "default",
    "modifiedDate": "2016-07-30T12:14:45.52"
  }
];

const generateId = (picture) => {
  let maxTripId = 0;
  for(let i = 0; i<trips.length; i++)
  {
    maxTripId = Math.max(maxTripId, trips[i].tripId);
  }
  return maxTripId+1;
};

class TripApi {

  static getAllTrips() {
    //alert('getAllTrips');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], trips));
      }, delay);
    });
  }

  static saveTrip(trip) {
    trip = Object.assign({}, trip); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTripTitleLength = 1;
        if (trip.title.length < minTripTitleLength) {
          reject(`Title must be at least ${minTripTitleLength} characters.`);
        }
        if (trip.tripId) {
          const existingTripIndex = trips.findIndex(a => a.tripId == trip.tripId);
          trips.splice(existingTripIndex, 1, trip);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new trips in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          trip.tripId = generateId(trip);
          trips.push(trip);
        }

        resolve(trip);
      }, delay);
    });
  }

  static deleteTrip(tripId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTripToDelete = trips.findIndex(trip => {
          trip.tripId == tripId;
        });
        trips.splice(indexOfTripToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TripApi;