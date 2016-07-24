import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const WaypointListRow = ({wayPoint, onEdit}) => {
  if (wayPoint === null) return (<tr><td colSpan="42">Null Waypoint</td></tr>);
  return (
    <tr>
      <td><Link to={'/trip/' + wayPoint.tripId}>{wayPoint.name}</Link></td>
      <td>{wayPoint.description} <a onClick = {onEdit}>inline</a></td>
    </tr>
  );
};

WaypointListRow.propTypes = {
  wayPoint: PropTypes.object.isRequired,
  onEdit : PropTypes.function
};

export default WaypointListRow;