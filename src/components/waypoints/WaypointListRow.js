import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import WaypointEditPopup from './WaypointEditPopup';

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
            <td>
              <WaypointEditPopup waypoint={this.props.waypoint}/> <a onClick = {this.onLocalEdit}>edit</a> <a onClick = {this.onLocalDelete}>delete</a>
            </td>
            <td>{this.props.waypoint.name}</td>
          </tr>
        );
    }
}

WaypointListRow.propTypes = {
  waypoint: PropTypes.object.isRequired,
  onEdit : PropTypes.func.isRequired,
  onDelete : PropTypes.func.isRequired
};

export default WaypointListRow;