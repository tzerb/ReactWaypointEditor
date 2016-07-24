import * as types from './actionTypes';
import TripApi from '../api/mockTripApi';
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
            dispatch(createTripSuccess(trip))
        }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}