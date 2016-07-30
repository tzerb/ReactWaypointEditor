import { combineReducers } from 'redux';
import trips from './tripReducer';
import waypoints from './waypointReducer';
import pictures from './pictureReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  trips,
  waypoints,
  pictures,
  ajaxCallsInProgress
});

export default rootReducer;
