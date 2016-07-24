import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import TextInputBig from '../common/TextInputBig';
import DateTime from '../common/DateTime';
import LocationInput from '../common/LocationInput';

const WaypointForm = ({wayPoint, onSave, onChange, saving, errors}) => {
  try {

    return (
      <form>
        <h1>Manage wayPoint</h1>
        <TextInput
          name="name"
          label="Name"
          value={wayPoint.name}
          onChange={onChange}
          error={errors.name}/>

        <TextInputBig
          name="description"
          label="Description"
          value={wayPoint.description}
          onChange={onChange}
          error={errors.description}/>

        <DateTime
          name="dateTime"
          label="DateTime"
          value={wayPoint.dateTime}
          onChange={onChange}
          error={errors.dateTime}/>

        <LocationInput
          name="location"
          label="Location"
          latitude = {wayPoint.latitude}
          longitude = {wayPoint.longitude}
          onChange={onChange}
          error={errors.location}/>

        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}/>

      </form>
    );
  } catch (ex)
  {
    return (<div>Error rendering WaypointForm</div>); 
  }

};

WaypointForm.propTypes = {
  wayPoint: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default WaypointForm;