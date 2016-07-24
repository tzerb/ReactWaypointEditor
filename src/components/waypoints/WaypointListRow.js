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
      this.props.onEdit(this.props.wayPoint);
    }

	  onLocalDelete()
    {
      this.props.onDelete(this.props.wayPoint);
    }

    render() {
        return (
          <tr>
            <td><a onClick = {this.onLocalEdit}>edit</a> <a onClick = {this.onLocalDelete}>delete</a></td>
            <td>{this.props.wayPoint.name}</td>
          </tr>
        );
    }
}

WaypointListRow.propTypes = {
  wayPoint: PropTypes.object.isRequired,
  onEdit : PropTypes.function,
  onDelete : PropTypes.function
};

export default WaypointListRow;