import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const locations = [
  {
    id: 'doorCounty',
    title: 'doorCounty'
  },
  {
    id: 'winnebago',
    title: 'winnebago'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.title.toLowerCase();
};

class LocationApi {
  static getAllLocations() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], locations));
      }, delay);
    });
  }
}

export default LocationApi;