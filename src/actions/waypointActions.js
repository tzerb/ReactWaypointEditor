import * as types from './actionTypes';
import ApiSelector from '../api/ApiSelector';
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

// export function saveWaypointSuccess(waypoint)
// {
//     return {type: types.SAVE_WAYPOINT_SUCCESS, waypoint};
// }

export function deleteWaypointSuccess(waypoint)
{
    return {type: types.DELETE_WAYPOINT_SUCCESS, waypoint};
}

export function loadWaypoints() {
    return function (dispatch){
        return ApiSelector.WaypointApi().getAllWaypoints().then(waypoints => {
            dispatch(loadWaypointSuccess(waypoints));
        }).catch (error => {
            throw(error);
        });
    };
}

export function saveWaypoint(waypoint) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.WaypointApi().saveWaypoint(waypoint).then(waypoint => {
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

export function deleteWaypoint(waypoint) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return ApiSelector.WaypointApi().deleteWaypoint(waypoint).then(waypoint => {
        dispatch(deleteWaypointSuccess(waypoint));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

