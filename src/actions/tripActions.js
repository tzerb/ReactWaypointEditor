import * as types from './actionTypes';
import ApiSelector from '../api/ApiSelector';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function createTripSuccess(trip)
{
    return {type: types.CREATE_TRIP_SUCCESS, trip};
}

export function updateTripSuccess(trip)
{
    return {type: types.UPDATE_TRIP_SUCCESS, trip};
}

export function loadTripSuccess(trips)
{
    return {type: types.LOAD_TRIPS_SUCCESS, trips};
}

export function deleteTripSuccess(trip)
{
    return {type: types.DELETE_TRIP_SUCCESS, trip};
}

export function deleteTripWaypointSuccess(trip, waypoint)
{
    return {type: types.DELETE_TRIP_SUCCESS, trip, waypoint};
}

export function loadTrips() {
    return function (dispatch){
        return ApiSelector.TripApi().getAllTrips().then(trips => {
            dispatch(loadTripSuccess(trips));
        }).catch (error => {
            throw(error);
        });
    };
}

export function saveTrip(trip) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.TripApi().saveTrip(trip).then(trip => {
        if (trip.tripId)
        {
            dispatch(updateTripSuccess(trip));
        }
        else
        {
            dispatch(createTripSuccess(trip));
        }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
 
}


export function deleteTrip(trip) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.TripApi().deleteTrip(trip.tripId).then(t => {
        dispatch(deleteTripSuccess(trip));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
} 