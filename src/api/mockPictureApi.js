import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const pictures = [
    {
      "pictureId": 1,
      "name": null,
      "description": "IMG_0319.JPG",
      "dateTime": "2016-07-07T17:34:21",
      "latitude": 43.9547805555556,
      "longitude": -88.6805638888889,
      "imageBytes": ""
    },    
    {
      "pictureId": 2,
      "name": null,
      "description": "IMG_0319.JPG",
      "dateTime": "2016-07-07T17:34:21",
      "latitude": 43.9547805555556,
      "longitude": -88.6805638888889,
      "imageBytes": ""
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

  static getAllPictures() {
    //alert('getAllPictures');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], pictures));
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
          const existingTripIndex = pictures.findIndex(a => a.tripId == trip.tripId);
          pictures.splice(existingTripIndex, 1, trip);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new pictures in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          trip.tripId = generateId(trip);
          pictures.push(trip);
        }

        resolve(trip);
      }, delay);
    });
  }

  static deleteTrip(tripId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTripToDelete = pictures.findIndex(trip => {
          trip.tripId == tripId;
        });
        pictures.splice(indexOfTripToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TripApi;