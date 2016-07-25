import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadTrips} from './actions/tripActions';
import {loadWaypoints} from './actions/waypointActions';
import WaypointApi from './api/WaypointApi';

import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// WaypointApi.getAllWaypoints()
//     .then(function (waypointList) { 
//         //alert('worked'+ waypointList.length);
//         let lastWaypointId =waypointList[waypointList.length-1].waypointId; 
//         let w = waypointList[0];
//         w.name=w.name+'a';
//         w.waypointId = null;
//         // WaypointApi.saveWaypoint(w).then((wp) => alert('save worked ' + wp.waypointId)).catch(() => alert('save failed'))
//         WaypointApi.deleteWaypoint(lastWaypointId).then(() => alert('delete worked')).catch((msg) => alert('delete failed: ' + msg));
//       })
//     .catch(function (msg ) { 
//         alert('getAllWaypoints failed : ' + msg); 
//     });

const store = configureStore();

// Dispatch actions to load initial state.
store.dispatch(loadTrips());
store.dispatch(loadWaypoints());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
