import React, {PropTypes} from 'react';
import  Modal from 'react-modal';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import moment from 'moment';

import TripForm from './TripForm';
import * as tripActions from '../../actions/tripActions';

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
class TripEditPopup extends React.Component {
    constructor(props, context)
    {
        super(props, context);

        this.state = {
          modalIsOpen: false,
          trip: Object.assign({}, this.props.trip),
          errors: {},
          saving: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.saveTrip = this.saveTrip.bind(this);
        this.updateTripState = this.updateTripState.bind(this);        
    }

  openModal() {
    this.setState(
        {modalIsOpen: true,
        trip: Object.assign({}, this.props.trip),
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
      
  updateTripState(event) {
    
    const field = event.target.name;
    let trip = this.state.trip;
    trip[field] = event.target.value;
    return this.setState({trip: trip});
  }

  saveTrip(event) {
    event.preventDefault();
    if (!this.tripFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.tripActions.saveTrip(this.state.trip)
      .then(() => { 
        this.closeModal();
        this.setState({saving: false});
        toastr.success('Trip saved');
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

                    <TripForm 
                        trip={this.state.trip}
                        onChange={this.updateTripState}
                        onSave={this.saveTrip}
                        errors={this.state.errors}
                        saving={this.state.saving}
                    />
                </Modal>                
            </span>
        );
    }
}

TripEditPopup.propTypes = {
  trip: PropTypes.object.isRequired,
  tripActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tripActions: bindActionCreators(tripActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripEditPopup);