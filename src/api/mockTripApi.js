import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const trips = [
{
  "tripId": 1,
  "title": "7/7/2016",
  "description": "07/07/2016",
  "dateTime": "2016-07-07T00:00:00",
  "tracks": [{trackId:1}],
  "wayPoints": [
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
    }
  ],
  "pictures": [
    {
      "pictureId": 1,
      "name": null,
      "description": "IMG_0319.JPG",
      "dateTime": "2016-07-07T17:34:21",
      "latitude": 43.9547805555556,
      "longitude": -88.6805638888889,
      "imageBytes": ""
    }
  ]
},
{
  "tripId": 2,
  "title": "7/8/2016",
  "description": "07/07/2016",
  "dateTime": "2016-07-07T00:00:00",
  "tracks": [{trackId:2}],
  "wayPoints": [
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
  ],
  "pictures": [
    {
      "pictureId": 2,
      "name": null,
      "description": "IMG_0319.JPG",
      "dateTime": "2016-07-07T17:34:21",
      "latitude": 43.9547805555556,
      "longitude": -88.6805638888889,
      "imageBytes": ""
    }
  ]
}
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (trip) => {
  return replaceAll(trip.title, ' ', '-');
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