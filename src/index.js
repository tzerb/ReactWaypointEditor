import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadTrips} from './actions/tripActions';
import {loadWaypoints} from './actions/waypointActions';
import {loadPictures} from './actions/pictureActions';
 
import './styles/styles.css'; //Webpack can import CSS files too!
import './styles/styles2.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// import TripApi from './api/TripApi';

// TripApi.getAllTrips()
//     .then(function (tripList) { 
//         //alert('worked'+ tripList.length);
//         debugger;
//         let lastTripId =tripList[tripList.length-1].tripId; 
//         let w = tripList[0];
//         w.title=w.title+'a';        

//         TripApi.saveTrip(w).then((wp1) => alert('save worked ' + wp1.tripId)).catch(() => alert('save failed'));
        
//         w.tripId = null;
//         TripApi.saveTrip(w).then((wp2) => alert('create worked ' + wp2.tripId)).catch(() => alert('create failed'));
        
//         // TripApi.deleteTrip(lastTripId).then(() => alert('delete worked')).catch((msg) => alert('delete failed: ' + msg));
//       })
//     .catch(function (msg ) { 
//         alert('getAllTrips failed : ' + msg); 
//     });

// import WaypointApi from './api/WaypointApi';
// WaypointApi.getAllWaypoints()
//     .then(function (waypointList) { 
//         //alert('worked'+ waypointList.length);
//         let lastWaypointId =waypointList[waypointList.length-1].waypointId; 
//         let w = waypointList[0];
//         w.name=w.name+'a';        

//         WaypointApi.saveWaypoint(w).then((wp1) => alert('save worked ' + wp1.waypointId)).catch(() => alert('save failed'));
        
//         w.waypointId = null;
//         WaypointApi.saveWaypoint(w).then((wp2) => alert('create worked ' + wp2.waypointId)).catch(() => alert('create failed'));
        
//         //WaypointApi.deleteWaypoint(lastWaypointId).then(() => alert('delete worked')).catch((msg) => alert('delete failed: ' + msg));
//       })
//     .catch(function (msg ) { 
//         alert('getAllWaypoints failed : ' + msg); 
//     });

// import PictureApi from './api/PictureApi';
// PictureApi.getAllPictures()
//     .then(function (pictureList) { 
//         // //alert('worked'+ pictureList.length);
//          let lastPictureId =pictureList[pictureList.length-1].pictureId; 
//         // let p = pictureList[0];
//         // p.name=p.name+'a';       
//         // debugger; 
//         // PictureApi.savePicture(p).then((p1) => alert('save worked ' + p1.pictureId)).catch(() => alert('save failed'));
        
//         // p.pictureId = null;
//         // PictureApi.savePicture(p).then((p2) => alert('create worked ' + p2.pictureId)).catch(() => alert('create failed'));
        
//         PictureApi.deletePicture(lastPictureId).then(() => alert('delete worked')).catch((msg) => alert('delete failed: ' + msg));
//       })
//     .catch(function (msg ) { 
//         alert('getAllPictures failed : ' + msg); 
//     });


const store = configureStore();

// Dispatch actions to load initial state.
try {
  // let trips = loadTrips();
  // TODO TZ - Use the server to load initial state?
  store.dispatch(loadTrips());
  store.dispatch(loadWaypoints());
  store.dispatch(loadPictures());
}
catch(ex)
{
  // TODO TZ - Should handle this better.
  alert("issue loading initial data (is the server running)");
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
