import React, {PropTypes} from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Title</th>
        <th>Location</th>
      </tr>
      </thead>
      <tbody>
      {trips.map(trip =>
        <TripListRow key={trip.tripId} trip={trip}/>
      )}
      </tbody>
    </table>
  );
};

TripList.propTypes = {
  trips: PropTypes.array.isRequired
};

export default TripList;
