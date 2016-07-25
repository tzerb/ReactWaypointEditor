import * as types from './actionTypes';
import WaypointApi from '../api/mockWaypointApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function createWaypointSuccess(waypoint)
{
    return {type: types.CREATE_WAYPOINT_SUCCESS, waypoint};
}

export function updateWaypointSuccess(waypoint)
{
    return {type: types.UPDATE_WAYPOINT_SUCCESS, waypoint};
}

export function loadWaypointSuccess(waypoints)
{
    return {type: types.LOAD_WAYPOINTS_SUCCESS, waypoints};
}

export function saveWaypointSuccess(waypoint)
{
    return {type: types.SAVE_WAYPOINT_SUCCESS, waypoint};
}

export function loadWaypoints() {
    return function (dispatch){
        return WaypointApi.getAllWaypoints().then(waypoints => {
            dispatch(loadWaypointSuccess(waypoints));
        }).catch (error => {
            throw(error);
        });
    };
}

export function saveWaypoint(waypoint) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return WaypointApi.saveWaypoint(waypoint).then(waypoint => {
        if (waypoint.waypointId)
        {
            dispatch(updateWaypointSuccess(waypoint));
        }
        else
        {
            dispatch(createWaypointSuccess(waypoint));
        }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}