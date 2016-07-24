import React, {PropTypes} from 'react';

const DateTimeDisplay = ({name, label, value}) => {
  let wrapperClass = '';

  return (
    <span className={wrapperClass}>
        <span>{label} : </span>
        <span>{value}</span>
    </span>
  );
};

DateTimeDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default DateTimeDisplay;
