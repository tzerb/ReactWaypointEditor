import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import Map5 from  '../common/Map5';
import LightboxView from  '../common/LightboxView';

import * as tripActions from '../../actions/tripActions';
import * as waypointActions from '../../actions/waypointActions';
import * as pictureActions from '../../actions/pictureActions';

import TripHeader from './TripHeader';

import WaypointList from '../waypoints/WaypointList';
import PictureList from '../pictures/PictureList';
import ApiConfig from '../../api/ApiConfig';
import ApiHelpers from '../../api/ApiHelpers';
import TripEditPopup from './TripEditPopup';

export class TripView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      trip: Object.assign({}, this.props.trip),
      errors: {},
      saving: false
    };
    //this.onEditWaypoint = this.onEditWaypoint.bind(this);
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
    this.props.pictureActions.deletePicture(picture)
      .then(() => { 
              toastr.success('Picture deleted');
            })
            .catch(error => {
                toastr.error(error);
                //this.setState({saving: false});
            });    
  }

  onDeleteWaypoint(waypoint)
  {
    this.props.waypointActions.deleteWaypoint(waypoint)
      .then(() => { 
              toastr.success('Waypoint deleted');
            })
            .catch(error => {
                toastr.error(error);
                //this.setState({saving: false});
            });
  }

  render() {
    try {
      return (   
        <div className=""> 
          <div className="row">
            <TripHeader trip={this.props.trip}/>
            <div><TripEditPopup trip={this.props.trip}/></div>
            <div>&nbsp;</div>
            <div className="col-md-5 well">
              <WaypointList waypoints={this.props.trip.waypoints} onEdit={this.onEditWaypoint} onDelete={this.onDeleteWaypoint}/>
              <Link to={'/waypoint/?tripId=' + this.props.trip.tripId}>Add Waypoint</Link>
            </div>
            <div className="col-md-5 well">
              <LightboxView pictures={this.props.trip.pictures} />
              <PictureList pictures={this.props.trip.pictures} onEdit={this.onEditPicture} onDelete={this.onDeletePicture}/>
            </div>          
          </div>
          {!ApiConfig.SimulateMap && 
          <div className="row">
            <div className="col-md-12">
              <Map5 waypoints={this.props.trip.waypoints} onEdit={this.onEditWaypoint} onDelete={this.onDeleteWaypoint}/>
            </div>
          </div>
          }
          {ApiConfig.SimulateMap && 
          <div className="row">
            <div className="col-md-12 well">
              <div>map simulation</div>
              <WaypointList waypoints={this.props.trip.waypoints} onEdit={this.onEditWaypoint} onDelete={this.onDeleteWaypoint}/>
            </div>
          </div>
          }     
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
  waypointActions: PropTypes.object.isRequired,
  pictureActions: PropTypes.object.isRequired

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