import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const pictures = 
[
  {
    "pictureId": 11,
    "name": "IMG_0319 - Copy.JPG",
    "description": "IMG_0319 - Copy.JPG",
    "dateTime": "2016-07-07T00:00:00",
    "latitude": 43.9547805555556,
    "longitude": -88.6805638888889,
    "imageBytes": null,
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
    "imageBytes": null,
    "tripId": 1,
    "createdBy": "default",
    "createdDate": "2016-07-30T22:22:35.063",
    "modifiedBy": "default",
    "modifiedDate": "2016-07-30T22:22:35.063"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (picture) => {
  let maxPictureId = 0;
  for(let i = 0; i<pictures.length; i++)
  {
    maxPictureId = Math.max(maxPictureId, pictures[i].pictureId);
  }
  return maxPictureId+1;
};

// const generateId = (picture) => {
//   return replaceAll(picture.title, ' ', '-');
// };

class PictureApi {

  static getAllPictures() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], pictures));
      }, delay);
    });
  }

  static savePicture(picture) {
    picture = Object.assign({}, picture); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minPictureNameLength = 1;
        if (picture.name.length < minPictureNameLength) {
          reject(`Name must be at least ${minPictureNameLength} characters.`);
        }
        if (picture.pictureId) {
          const existingPictureIndex = pictures.findIndex(a => a.pictureId == picture.pictureId);
          pictures.splice(existingPictureIndex, 1, picture);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new pictures in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          picture.pictureId = generateId(picture);
          pictures.push(picture);
        }

        resolve(picture);
      }, delay);
    });
  }

  static deletePicture(pictureId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfPictureToDelete = pictures.findIndex(picture => {
          picture.pictureId == pictureId;
        });
        pictures.splice(indexOfPictureToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default PictureApi;