import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const TripListRow = ({trip}) => {
  return (
    <tr>
      <td><Link to={'/tripview/' + trip.tripId}>{trip.title}</Link></td>
      <td>{trip.description}</td>
      <td><Link to={'/trip/' + trip.tripId}>Edit</Link></td>
    </tr>
  );
};

TripListRow.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripListRow;