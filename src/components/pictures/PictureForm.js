import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import TextInputBig from '../common/TextInputBig';
import DateTime from '../common/DateTime';
import DateInput from '../common/DateInput';

const PictureForm = ({picture, onSave, onChange, saving, errors}) => {
  try {

    return (
      <form>
        <h1>Manage Picture </h1>
        <TextInput
          name="name"
          label="name"
          value={picture.name}
          onChange={onChange}
          error={errors.name}/>

        <TextInputBig
          name="description"
          label="Description"
          value={picture.description}
          onChange={onChange}
          error={errors.description}/>

        <TextInputBig
          name="dateTime"
          label="DateTime"
          value={picture.dateTime}
          onChange={onChange}
          error={errors.dateTime}/>
          
        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}/>
          
      </form>
    );        // TODO TZ Add lat/long here?

  } catch (ex)
  {
    return (<div>Error rendering PictureForm</div>); 
  }

};

PictureForm.propTypes = {
  picture: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default PictureForm;