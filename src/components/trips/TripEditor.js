import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tripActions from '../../actions/tripActions';
import TripForm from './TripForm';
import toastr from 'toastr';

class TripEditor extends React.Component {
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
        trip={this.props.trip}
        onChange={this.updateTripState}
        onSave={this.saveTrip}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

TripEditor.propTypes = {
  trip: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
TripEditor.contextTypes = {
  router: PropTypes.object
};

export default TripEditor;