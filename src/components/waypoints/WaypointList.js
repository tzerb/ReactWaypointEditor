import React, {PropTypes} from 'react';
import WaypointListRow from './WaypointListRow';

const WaypointList = ({wayPoints, onEdit}) => {
  return (
    <div>

    {wayPoints===null &&
      <span>The list is null.</span>
    }

    {wayPoints && (wayPoints.length===0) &&
      <span>The list is empty.</span>
    }

    {wayPoints && (wayPoints.length>0) &&

      <table className="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
            {wayPoints.map(wayPoint =>
              <WaypointListRow key={wayPoint.waypointId} wayPoint={wayPoint} onEdit={onEdit} />
            )} 
          </tbody>
        </table>
    }

    </div>
  );
};

WaypointList.propTypes = {
  wayPoints: PropTypes.array.isRequired,
  onEdit: PropTypes.function
};

export default WaypointList;
