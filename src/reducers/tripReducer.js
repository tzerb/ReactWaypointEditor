import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tripReducer(state = initialState.trips, action) {

    switch(action.type) {

        case types.LOAD_TRIPS_SUCCESS:
            return action.trips;

        case types.CREATE_TRIP_SUCCESS:
        return [
            ...state,
            Object.assign({}, action.trip)
        ];

        case types.UPDATE_TRIP_SUCCESS:
        return [
            ...state.filter(trip => trip.tripId !== action.trip.tripId),
            Object.assign({}, action.trip)
        ];

        case types.DELETE_TRIP_SUCCESS:
        return [
            ...state.filter(trip => trip.tripId !== action.trip.tripId)
        ];

        case types.DELETE_TRIP_WAYPOINT_SUCCESS:
        //let newState = [...state];
        return [
            ...state
        ];

        case types.DELETE_WAYPOINT_SUCCESS:
        if (action.waypoint.tripId && action.waypoint.tripId!=0)
        {
            let tripsWithWaypoint = state.filter(trip => trip.tripId == action.waypoint.tripId);
            let newTrip = Object.assign({}, tripsWithWaypoint[0]);
            newTrip.waypoints = [...newTrip.waypoints.filter(wp => wp.waypointId !== action.waypoint.waypointId)];
            let newState = [
                ...state.filter(trip => trip.tripId !== action.waypoint.tripId),
                newTrip
            ]; 
            return [...newState];
        }
        
        case types.UPDATE_WAYPOINT_SUCCESS:
        if (action.waypoint.tripId && action.waypoint.tripId!=0)
        {
            let tripsWithWaypoint = state.filter(trip => trip.tripId == action.waypoint.tripId);
            let newTrip = Object.assign({}, tripsWithWaypoint[0]);
            newTrip.waypoints = [...newTrip.waypoints.filter(wp => wp.waypointId !== action.waypoint.waypointId), Object.assign({}, action.waypoint)];
            let newState = [
                ...state.filter(trip => trip.tripId !== action.waypoint.tripId),
                newTrip
            ];
            return [...newState];
        }
        else
            return [...state];

        default:
            return state;
    }
}