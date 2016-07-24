import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import TripsPage from './components/trips/TripsPage';
import ManageTripPage from './components/trips/ManageTripPage'; //eslint-disable-line import/no-named-as-default

import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="courses" component={CoursesPage}/>
    <Route path="course/:id" component={ManageCoursePage}/>
    <Route path="course" component={ManageCoursePage}/>

    <Route path="trips" component={TripsPage}/>
    <Route path="trip/:id" component={ManageTripPage}/>
    <Route path="trip" component={ManageTripPage}/>

    <Route path="about" component={AboutPage}/>
  </Route>
);
