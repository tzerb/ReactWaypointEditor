import React, {PropTypes} from 'react';

const LocationInput = ({name, label, onChange, placeholder, latitude, longitude, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      {false && <div>{label}</div>}
      <label htmlFor={name}>Latitude</label>
      <div className="field">
        <input
          type="text"
          name="latitude"
          className="form-control"
          placeholder={placeholder}
          value={latitude}
          onChange={onChange}/>
      </div>
      <label htmlFor={name}>Longitude</label>
      <div className="field">
        <input
          type="text"
          name="longitude"
          className="form-control"
          placeholder={placeholder}
          value={longitude}
          onChange={onChange}/>          
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

LocationInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  error: PropTypes.string
};

export default LocationInput;
