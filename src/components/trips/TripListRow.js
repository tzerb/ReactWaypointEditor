import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TripEditPopup from './TripEditPopup';

class TripListRow extends React.Component {
    constructor(props, context)    {
        super(props, context);

        this.onLocalEdit = this.onLocalEdit.bind(this);
        this.onLocalDelete = this.onLocalDelete.bind(this);

    }

    onLocalEdit()
    {
      //this.props.onEdit(this.props.waypoint);
    }

    onLocalDelete()
    {
      this.props.onDeleteTrip(this.props.trip);
    }


    render() {
        return (
          <tr>
            <td><Link to={'/tripview/' + this.props.trip.tripId}>{this.props.trip.title}</Link></td>
            <td>{this.props.trip.description}</td>
            <td><TripEditPopup trip={this.props.trip}/> | <a onClick={this.onLocalDelete}>delete</a></td>
          </tr>
        );
    }
}

TripListRow.propTypes = {
  trip: PropTypes.object.isRequired,
  onDeleteTrip: PropTypes.func.isRequired
};

export default TripListRow;