import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as waypointActions from '../../actions/waypointActions';
import waypointForm from './WaypointForm';
import toastr from 'toastr';

export class ManageWaypointPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      waypoint: Object.assign({}, this.props.waypoint),
      errors: {},
      saving: false
    };
 
    this.savewaypoint = this.savewaypoint.bind(this);
    this.updatewaypointState = this.updatewaypointState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.waypoint.waypointId != nextProps.waypoint.waypointId) {
      // Necessary to populate form when existing waypoint is loaded directly.
      this.setState({waypoint: Object.assign({}, nextProps.waypoint)});
    }
  }

  updatewaypointState(event) {
    const field = event.target.name;
    let waypoint = this.state.waypoint;
    waypoint[field] = event.target.value;
    return this.setState({waypoint: waypoint});
  }

  waypointFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.waypoint.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  savewaypoint(event) {
    event.preventDefault();
    if (!this.waypointFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.savewaypoint(this.state.waypoint)
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
    toastr.success('waypoint saved.');
    this.context.router.push('/waypoints');
  }

  render() {
    return (
      <waypointForm
        waypoint={this.state.waypoint}
        onChange={this.updatewaypointState}
        onSave={this.savewaypoint}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageWaypointPage.propTypes = {
  waypoint: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageWaypointPage.contextTypes = {
  router: PropTypes.object
};

function getwaypointById(waypoints, waypointId) {
  const waypoint = waypoints.filter(waypoint => waypoint.waypointId == waypointId);
  if (waypoint) return waypoint[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const waypointId = ownProps.params.id; // from the path `/waypoint/:id`

  let waypoint = {id: '', title: '' };

  if (waypointId && state.waypoints.length > 0) {
    waypoint = getwaypointById(state.waypoints, waypointId);
  }

  return {
    waypoint: waypoint
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(waypointActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageWaypointPage);