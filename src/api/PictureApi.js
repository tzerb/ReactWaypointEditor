import $ from 'jquery';
import ApiConfig from './ApiConfig';
import ApiHelpers from './ApiHelpers';

const pictures = [];
 
class PictureApi {

  static getAllPictures() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: ApiConfig.ApiServer + "/api/Picture",
        context: document.body,
        success: function(pictureList,status,xhr){
          resolve(Object.assign([], pictureList));
        }, 
        error: function(xhr,status,exception){
          reject('Ajax call for getAllPictures failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
        }
        
      });

    });
  }

  static savePicture(picture) {
    picture = Object.assign({}, picture); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
        // Simulate server-side validation
        const minPictureDescriptionLength = 1;
        if (picture.description.length < minPictureDescriptionLength) {
          reject(`Description must be at least ${minPictureDescriptionLength} characters.`);
        }
        if (picture.pictureId) {
          $.ajax({
            method: "PUT",
            url: ApiConfig.ApiServer + "/api/Picture",
            data: picture,
            context: document.body,
            success: function(changedPicture,status,xhr){
              resolve(Object.assign([], changedPicture));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for savePicture(update) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        } else {
          $.ajax({
            method: "POST",
            url: ApiConfig.ApiServer + "/api/Picture",
            data: picture,
            context: document.body,
            success: function(createdPicture,status,xhr){
              resolve(Object.assign([], createdPicture));
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for savePicture(create) failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
        }

    });
  }

  static deletePicture(pictureId) {
    return new Promise((resolve, reject) => {
          $.ajax({
            method: "DELETE",
            url: ApiConfig.ApiServer + "/api/Picture/" + pictureId,
            context: document.body,
            success: function(){
              resolve(pictureId);
            }, 
            error: function(xhr,status,exception){
              reject('Ajax call for deletePicture failed - ' + ApiHelpers.formatErrorMessage(xhr, exception));
            }            
          });
    });
  }
}

export default PictureApi;