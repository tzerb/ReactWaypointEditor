import { combineReducers } from 'redux';
import trips from './tripReducer';
import waypoints from './waypointReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  trips,
  waypoints,
  ajaxCallsInProgress
});

export default rootReducer;
