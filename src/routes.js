import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';

import TripsPage from './components/trips/TripsPage';
import TripView from './components/trips/TripView';//eslint-disable-line import/no-named-as-default
import ManageTripPage from './components/trips/ManageTripPage'; //eslint-disable-line import/no-named-as-default

import ManageWaypointPage from './components/waypoints/ManageWaypointPage'; //eslint-disable-line import/no-named-as-default

import ManageTrackPage from './components/tracks/ManageTrackPage'; //eslint-disable-line import/no-named-as-default

import DeepLinkingIsNotEnabled from './components/errors/DeepLinkingIsNotEnabled'; //eslint-disable-line import/no-named-as-default
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="trips" component={TripsPage}/>
    <Route path="trip/:id" component={ManageTripPage}/>
    <Route path="trip" component={ManageTripPage}/>
    <Route path="tripview/:id" component={TripView}/>

    <Route path="waypoint" component={ManageWaypointPage}/>
    <Route path="waypoint/:id" component={ManageWaypointPage}/>

    <Route path="track/:id" component={ManageTrackPage}/>

    <route path="ndl" component={DeepLinkingIsNotEnabled}/>
    <Route path="about" component={AboutPage}/>
  </Route>
);
