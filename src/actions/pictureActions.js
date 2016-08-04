import * as types from './actionTypes';
import ApiSelector from '../api/ApiSelector';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function createPictureSuccess(picture)
{
    return {type: types.CREATE_PICTURE_SUCCESS, picture};
}

export function updatePictureSuccess(picture)
{
    return {type: types.UPDATE_PICTURE_SUCCESS, picture};
}

export function loadPictureSuccess(pictures)
{
    return {type: types.LOAD_PICTURES_SUCCESS, pictures};
}

export function deletePictureSuccess(picture)
{
    return {type: types.DELETE_PICTURE_SUCCESS, picture};
}

export function deletePictureWaypointSuccess(picture, waypoint)
{
    return {type: types.DELETE_PICTURE_SUCCESS, picture, waypoint};
}

export function loadPictures() {
    return function (dispatch){
        return ApiSelector.PictureApi().getAllPictures().then(pictures => {
            dispatch(loadPictureSuccess(pictures));
        }).catch (error => {
            throw(error);
        });
    };
}

export function savePicture(picture) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.PictureApi().savePicture(picture).then(picture => {
        if (picture.pictureId)
        {
            dispatch(updatePictureSuccess(picture));
        }
        else
        {
            dispatch(createPictureSuccess(picture));
        }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
 
}


export function deletePicture(picture) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.PictureApi().deletePicture(picture.pictureId).then(t => {
        dispatch(deletePictureSuccess(picture));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
} 