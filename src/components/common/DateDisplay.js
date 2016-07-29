import React, {PropTypes} from 'react';
import moment from 'moment';

const DateDisplay = ({name, label, value}) => {
  let wrapperClass = '';

  let date = moment(value).format('MM/DD/YYYY');
  return (
    <span className={wrapperClass}>
        <span>{label} : </span>
        <span>{date}</span>
    </span>
  );
};

DateDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default DateDisplay;
