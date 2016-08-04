import React, {PropTypes} from 'react';
import WaypointListRow from './WaypointListRow';

const WaypointList = ({waypoints, onEdit, onDelete}) => {
  return (
    <div>

    {waypoints===null &&
      <span>The list is null.</span>
    }

    {waypoints && (waypoints.length===0) &&
      <span>The list is empty.</span>
    }

    {waypoints && (waypoints.length>0) &&

      <table className="table">
          <thead>
          <tr>
            <th width="140"></th>
            <th>Title</th>
          </tr>
          </thead>
          <tbody>
            {waypoints.map(waypoint =>
              <WaypointListRow key={waypoint.waypointId} waypoint={waypoint} onEdit={onEdit} onDelete={onDelete}/>
            )} 
          </tbody>
        </table>
    }

    </div>
  );
};

WaypointList.propTypes = {
  waypoints: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default WaypointList;
