import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';

import * as tripActions from '../../actions/tripActions';
import TripList from './TripList';
import TripEditor from './TripEditor';

class TripPage extends React.Component {
    constructor(props, context)    {
        super(props, context);
        this.deleteTrip = this.deleteTrip.bind(this);
    }

    deleteTrip(tripId)
    {
        this.props.actions.deleteTrip(tripId)
            .then(() => { 
                toastr.success('trip deleted');
            })
            .catch(error => {
                toastr.error(error);
                //this.setState({saving: false});
            });
    }

    render() {
        return (
            <div>
                <h1>Trips</h1>
                <TripList trips={this.props.trips} onDeleteTrip={this.deleteTrip}/>
                <Link to={'/trip'}>Add Trip</Link>
            </div>
        );
    }
}

TripPage.propTypes = {
    trips: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequried
};

function mapStateToProps(state, ownProps)
{
    return {
        trips: state.trips
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // createTrip: trip => dispatch(tripActions.createTrip(trip))
        actions: bindActionCreators(tripActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (TripPage);