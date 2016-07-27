import * as types from './actionTypes';
import TripApi from '../api/TripApi';
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

export function saveTripSuccess(trip)
{
    return {type: types.SAVE_TRIP_SUCCESS, trip};
}

export function deleteTripSuccess(tripId)
{
    return {type: types.DELETE_TRIP_SUCCESS, tripId};
}

export function deleteTripWaypointSuccess(trip, waypoint)
{
    return {type: types.DELETE_TRIP_SUCCESS, trip, waypoint};
}

export function loadTrips() {
    return function (dispatch){
        return TripApi.getAllTrips().then(trips => {
            dispatch(loadTripSuccess(trips));
        }).catch (error => {
            throw(error);
        });
    };
}

export function saveTrip(trip) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TripApi.saveTrip(trip).then(trip => {
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


export function deleteTrip(tripId) {
    console.log('here');
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TripApi.deleteTrip(tripId).then(trip => {
        console.log('then');
        dispatch(deleteTripSuccess(tripId));
    }).catch(error => {
      console.log('error');
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
} 