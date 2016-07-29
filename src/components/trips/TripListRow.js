import React, {PropTypes} from 'react';
import {Link} from 'react-router';

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
      this.props.onDeleteTrip(this.props.trip.tripId);
    }


    render() {
        return (
          <tr>
            <td><Link to={'/tripview/' + this.props.trip.tripId}>{this.props.trip.title}</Link></td>
            <td>{this.props.trip.description}</td>
            <td><Link to={'/trip/' + this.props.trip.tripId}>Edit</Link> | <a onClick={this.onLocalDelete}>delete</a></td>
          </tr>
        );
    }
}

TripListRow.propTypes = {
  trip: PropTypes.object.isRequired,
  onDeleteTrip: PropTypes.func.isRequired
};

export default TripListRow;