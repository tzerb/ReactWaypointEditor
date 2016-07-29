import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import TextInputBig from '../common/TextInputBig';
import DateTime from '../common/DateTime';
import LocationInput from '../common/LocationInput';

const WaypointForm = ({waypoint, onSave, onChange, saving, errors}) => {
  try {
 
    return (
      <form>
        <h1>Manage waypoint</h1>
        <TextInput
          name="name"
          label="Name"
          value={waypoint.name}
          onChange={onChange}
          error={errors.name}/>

        <TextInputBig
          name="description"
          label="Description"
          value={waypoint.description}
          onChange={onChange}
          error={errors.description}/>

        <DateTime
          name="dateTime"
          label="DateTime"
          value={waypoint.dateTime}
          onChange={onChange}
          error={errors.dateTime}/>

        <LocationInput
          name="location"
          label="Location"
          latitude = {waypoint.latitude}
          longitude = {waypoint.longitude}
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
  waypoint: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default WaypointForm;