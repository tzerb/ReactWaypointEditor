import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tripReducer(state = initialState.pictures, action) {
    switch(action.type) {
        case types.LOAD_PICTURES_SUCCESS:
            return [...action.pictures];
	    default:    
	        return state;
    }
}