import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tripReducer(state = initialState.pictures, action) {
    switch(action.type) {
        case types.LOAD_PICTURES_SUCCESS:
            return [...action.pictures];
        default:    
            return state;

        case types.CREATE_PICTURE_SUCCESS:
        return [
            ...state,
            Object.assign({}, action.picture)
        ];

        case types.UPDATE_PICTURE_SUCCESS:
        return [
            ...state.filter(picture => picture.pictureId !== action.picture.pictureId),
            Object.assign({}, action.picture)
        ];

        case types.DELETE_PICTURE_SUCCESS:
        return [
            ...state.filter(picture => picture.pictureId !== action.picture.pictureId)
        ];            
    }
}