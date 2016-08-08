import React, {PropTypes} from 'react';
import  Modal from 'react-modal';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import moment from 'moment';

import WaypointForm from './WaypointForm';
import * as waypointActions from '../../actions/waypointActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay : {
    backgroundColor : 'rgba(127, 127, 127, 0.7'
  }
};
class WaypointEditPopup extends React.Component {
    constructor(props, context)
    {
        super(props, context);

        this.state = {
          modalIsOpen: false,
          waypoint: Object.assign({}, this.props.waypoint),
          errors: {},
          saving: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.saveWaypoint = this.saveWaypoint.bind(this);
        this.updateWaypointState = this.updateWaypointState.bind(this);        
    }

  openModal() {
    this.setState(
        {modalIsOpen: true,
        waypoint: Object.assign({}, this.props.waypoint),
        errors: {},
        saving: false
        });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  waypointFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.waypoint.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
      formIsValid = false;
    }

    if (!(moment(this.state.waypoint.dateTime).isValid()))
    {
      // TODO TZ do we need better name than 'DateTime'  (TripDate?)?!?
      errors.dateTime = 'DateTime is not valid.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }
      
  updateWaypointState(event) {
    const field = event.target.name;
    let waypoint = this.state.waypoint;
    waypoint[field] = event.target.value;
    return this.setState({waypoint: waypoint});
  }

  saveWaypoint(event) {
    event.preventDefault();
    if (!this.waypointFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.waypointActions.saveWaypoint(this.state.waypoint)
      .then(() => { 
        this.closeModal();
        this.setState({saving: false});
        toastr.success('Waypoint saved');
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

    render() {
        return (
            <span>
                <a onClick={this.openModal}>Edit</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles} >

                    <WaypointForm 
                        waypoint={this.state.waypoint}
                        onChange={this.updateWaypointState}
                        onSave={this.saveWaypoint}
                        errors={this.state.errors}
                        saving={this.state.saving}
                    />
                </Modal>                
            </span>
        );
    }
}

WaypointEditPopup.propTypes = {
  waypoint: PropTypes.object.isRequired,
  waypointActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    waypointActions: bindActionCreators(waypointActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WaypointEditPopup);