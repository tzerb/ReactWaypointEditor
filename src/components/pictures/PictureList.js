import React, {PropTypes} from 'react';
import PictureListRow from './PictureListRow';

const PictureList = ({pictures, onDeletePicture}) => {
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
        <PictureListRow key={picture.pictureId} picture={picture} onDeletePicture={onDeletePicture}/>
      )}
      </tbody>
    </table>
  );
};
//
PictureList.propTypes = {
  pictures: PropTypes.array.isRequired,
  onDeletePicture : PropTypes.func.isRequired
};

export default PictureList;
