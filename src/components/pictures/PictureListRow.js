import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ApiSelector from '../../api/ApiSelector';

class PictureListRow extends React.Component {
    constructor(props, context)    {
        super(props, context);

        this.onLocalEdit = this.onLocalEdit.bind(this);
        this.onLocalDelete = this.onLocalDelete.bind(this);

    }

    onLocalEdit()
    {
      this.props.onEdit(this.props.picture);
    }

    onLocalDelete()
    {
      this.props.onDelete(this.props.picture);
    }
//"http://localhost:15989//Pictures/Image?pictureId="+
    render() {
        return (
          <tr>
            <td><Link to={'/picture/'+this.props.picture.pictureId}>edit</Link> <a onClick = {this.onLocalEdit}>edit</a> <a onClick = {this.onLocalDelete}>delete</a></td>
            <td>{this.props.picture.description}<img width="100" src={ApiSelector.Picture(this.props.picture.pictureId)}/></td>
          </tr>
        );
    }
}

PictureListRow.propTypes = {
  picture: PropTypes.object.isRequired,
  onEdit : PropTypes.func.isRequired,
  onDelete : PropTypes.func.isRequired
};

export default PictureListRow;