import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class WaypointListRow extends React.Component {
    constructor(props, context)    {
        super(props, context);

        this.onLocalEdit = this.onLocalEdit.bind(this);
        this.onLocalDelete = this.onLocalDelete.bind(this);

    }

    onLocalEdit()
    {
      this.props.onEdit(this.props.waypoint);
    }

    onLocalDelete()
    {
      this.props.onDelete(this.props.waypoint);
    }

    render() {
        return (
          <tr>
            <td><Link to={'/waypoint/'+this.props.waypoint.waypointId}>edit</Link> <a onClick = {this.onLocalEdit}>edit</a> <a onClick = {this.onLocalDelete}>delete</a></td>
            <td>{this.props.waypoint.name}</td>
          </tr>
        );
    }
}

WaypointListRow.propTypes = {
  waypoint: PropTypes.object.isRequired,
  onEdit : PropTypes.function,
  onDelete : PropTypes.function
};

export default WaypointListRow;