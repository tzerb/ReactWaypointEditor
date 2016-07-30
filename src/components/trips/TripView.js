import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';

import * as tripActions from '../../actions/tripActions';
import * as waypointActions from '../../actions/waypointActions';
import * as pictureActions from '../../actions/pictureActions';

import TripHeader from './TripHeader';

import WaypointList from '../waypoints/WaypointList';
import PictureList from '../pictures/PictureList';

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

    this.onEditPicture = this.onEditPicture.bind(this);
    this.onDeletePicture = this.onDeletePicture.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trip.tripId != nextProps.trip.tripId) {
      // Necessary to populate form when existing trip is loaded directly.
      this.setState({trip: Object.assign({}, nextProps.trip)});
    }
  }

  onEditPicture(picture)
  {
    alert('edit picture-' + picture.pictureId);
  }
  
  onDeletePicture(picture)
  {
    // alert('delete picture-' + picture.pictureId);
    toastr.success('picture delete START (# pictures on this trip=' + this.props.trip.pictures.length);
    
    this.props.pictureActions.deletePicture(picture)
      .then(() => { 
                // TODO TZ - remove debugging code.
                toastr.success('picture deleted (# pictures on this trip=' + this.props.trip.pictures.length);
            })
            .catch(error => {
                toastr.error(error);
                //this.setState({saving: false});
            });    
  }

  onEditWaypoint(waypoint)
  {
    alert('edit waypoint-' + waypoint.waypointId);
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
    toastr.warning('render');
    
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
                <PictureList pictures={this.props.trip.pictures} onEdit={this.onEditPicture} onDelete={this.onDeletePicture}/>
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
    waypointActions: bindActionCreators(waypointActions, dispatch),
    pictureActions: bindActionCreators(pictureActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripView);