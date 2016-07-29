import React, {PropTypes} from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips, onDeleteTrip}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {trips.map(trip =>
        <TripListRow key={trip.tripId} trip={trip} onDeleteTrip={onDeleteTrip}/>
      )}
      </tbody>
    </table>
  );
};
//
TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  onDeleteTrip : PropTypes.func.isRequired
};

export default TripList;
