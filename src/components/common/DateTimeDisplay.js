import React, {PropTypes} from 'react';
import moment from 'moment';

const DateTimeDisplay = ({name, label, value}) => {
  let wrapperClass = '';
  let date = moment(value).format();
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
