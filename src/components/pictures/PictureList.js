import React, {PropTypes} from 'react';
import PictureListRow from './PictureListRow';

const PictureList = ({pictures, onDelete, onEdit}) => {
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
      {pictures.map(picture =>
        <PictureListRow key={picture.pictureId} picture={picture} onDelete={onDelete} onEdit={onEdit}/>
      )}
      </tbody>
    </table>
  );
};
//
PictureList.propTypes = {
  pictures: PropTypes.array.isRequired,
  onDelete : PropTypes.func.isRequired,
  onEdit : PropTypes.func.isRequired
};

export default PictureList;
