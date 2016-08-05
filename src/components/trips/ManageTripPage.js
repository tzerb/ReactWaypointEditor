import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import moment from 'moment';

import * as tripActions from '../../actions/tripActions';
import TripForm from './TripForm';


export class ManageTripPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      trip: Object.assign({}, this.props.trip),
      errors: {},
      saving: false
    };
 
    this.saveTrip = this.saveTrip.bind(this);
    this.updateTripState = this.updateTripState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trip.tripId != nextProps.trip.tripId) {
      // Necessary to populate form when existing trip is loaded directly.
      this.setState({trip: Object.assign({}, nextProps.trip)});
    }
  }

  updateTripState(event) {
    const field = event.target.name;
    let trip = this.state.trip;
    trip[field] = event.target.value;
    return this.setState({trip: trip});
  }

  tripFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.trip.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    if (!(moment(this.state.trip.dateTime, 'MM/DD/YYYY', true).isValid()))
    {
      // TODO TZ do we need better name than 'DateTime'  (TripDate?)?!?
      errors.dateTime = 'DateTime is not valid.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  saveTrip(event) {
    event.preventDefault();
    if (!this.tripFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveTrip(this.state.trip)
      .then(() => { 
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Trip saved.');
    this.context.router.push('/trips');
  }

  render() {
    return (
      <TripForm
        trip={this.state.trip}
        onChange={this.updateTripState}
        onSave={this.saveTrip}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageTripPage.propTypes = {
  trip: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageTripPage.contextTypes = {
  router: PropTypes.object
};

function getTripById(trips, tripId) {
  const trip = trips.filter(trip => trip.tripId == tripId);
  if (trip) return trip[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const tripId = ownProps.params.id; // from the path `/trip/:id`

  let trip = {tripId: null, title: 'title', description: 'description', dateTime: '01/01/2015', waypoints:[], pictures:[]};

  if (tripId && state.trips.length > 0) {
    trip = getTripById(state.trips, tripId);
  }

  return {
    trip: trip
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tripActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTripPage);