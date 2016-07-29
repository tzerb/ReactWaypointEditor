import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import Map3 from  '../common/Map3';
import * as tripActions from '../../actions/tripActions';
import * as waypointActions from '../../actions/waypointActions';

import TripHeader from './TripHeader';

import WaypointList from '../waypoints/WaypointList';

export class TripView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      trip: Object.assign({}, this.props.trip),
      errors: {},
      saving: false
    };
    this.onEditWaypoint = this.onEditWaypoint.bind(this);
    this.onDeleteWaypoint = this.onDeleteWaypoint.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // TODO TZ - remove debugging code.
    toastr.success('TripView.componentWillReceiveProps');
    
    if (this.props.trip.tripId != nextProps.trip.tripId) {
      // Necessary to populate form when existing trip is loaded directly.
      this.setState({trip: Object.assign({}, nextProps.trip)});
    }
  }

  onEditWaypoint(waypoint)
  {
    alert('edit-' + waypoint.waypointId);
  }
  
  onDeleteWaypoint(waypoint)
  {
    // TODO TZ - remove debugging code.
    toastr.success('waypoint delete START (# waypoints on this trip=' + this.props.trip.waypoints.length);
    
    this.props.waypointActions.deleteWaypoint(waypoint)
      .then(() => { 
                // TODO TZ - remove debugging code.
                toastr.success('waypoint deleted (# waypoints on this trip=' + this.props.trip.waypoints.length);
            })
            .catch(error => {
                toastr.error(error);
                //this.setState({saving: false});
            });
  }

  render() {
    // TODO TZ - remove debugging code.
    //toastr.warning('render');
    
    try {
      return (   
        <div className=""> 
          <div className="row">
            <TripHeader trip={this.props.trip}/>
            <div className="col-md-3 well">
              <WaypointList waypoints={this.props.trip.waypoints} onEdit={this.onEditWaypoint} onDelete={this.onDeleteWaypoint}/>
              <Link to={'/waypoint'}>Add Waypoint</Link>
            </div>
            <div className="col-md-3 well">
                <WaypointList waypoints={this.props.trip.waypoints} onEdit={this.onEditWaypoint} onDelete={this.onDeleteWaypoint}/>
            </div>          
          </div>
          <div className="row">
            <div className="col-md-12 well">
              <Map3 waypoints={this.props.trip.waypoints}/>
            </div>
          </div>
        </div>
      );
    }
    catch(ex)
    {
      return (<div>error in TripView</div>);
    }
  }
  
}

TripView.propTypes = {
  trip: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  waypointActions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
TripView.contextTypes = {
  router: PropTypes.object
};

function getTripById(trips, tripId) {
  const trip = trips.filter(trip => trip.tripId == tripId);
  if (trip) return trip[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const tripId = ownProps.params.id; // from the path `/trip/:id`

  // TODO TZ - Clear these up, have a new Trip() or something like that.
  let trip = {id: '', title: '' };

  if (tripId && state.trips.length > 0) {
    trip = getTripById(state.trips, tripId);
  }

  return {
    trip: trip
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tripActions, dispatch),
    waypointActions: bindActionCreators(waypointActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripView);