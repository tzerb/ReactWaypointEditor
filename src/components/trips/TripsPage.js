import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tripActions from '../../actions/tripActions';
import TripList from './TripList';

class TripPage extends React.Component {
    constructor(props, context)    {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>Trips</h1>
                <TripList trips={this.props.trips}/>
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