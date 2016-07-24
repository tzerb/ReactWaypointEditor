import * as types from './actionTypes';

export function loadTripSuccess(trips)
{
    return {type: types.LOAD_TRIPS_SUCCESS, trips};
}