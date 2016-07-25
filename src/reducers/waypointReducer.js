import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function waypointReducer(state = initialState.waypoints, action) {
    switch(action.type) {

        case types.LOAD_WAYPOINTS_SUCCESS:
            //alert('LOAD_WAYPOINTS_SUCCESS');
            return action.waypoints;

        case types.CREATE_WAYPOINT_SUCCESS:
        return [
            ...state,
            Object.assign({}, action.waypoint)
        ];

        case types.UPDATE_WAYPOINT_SUCCESS:
        return [
            ...state.filter(waypoint => waypoint.waypointId !== action.waypoint.waypointId),
            Object.assign({}, action.waypoint)
        ];

        case types.DELETE_WAYPOINT_SUCCESS:
        return [
            ...state.filter(waypoint => waypoint.waypointId !== action.waypoint.waypointId)
        ];

        default:
            return state;
    }
}