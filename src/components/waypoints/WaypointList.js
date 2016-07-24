import React, {PropTypes} from 'react';
import WaypointListRow from './WaypointListRow';

const WaypointList = ({wayPoints, onEdit, onDelete}) => {
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
            <th width="140"></th>
            <th>Title</th>
          </tr>
          </thead>
          <tbody>
            {wayPoints.map(wayPoint =>
              <WaypointListRow key={wayPoint.waypointId} wayPoint={wayPoint} onEdit={onEdit} onDelete={onDelete}/>
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
