import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import trips from './tripReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  trips,
  ajaxCallsInProgress
});

export default rootReducer;
