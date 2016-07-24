import React, {PropTypes} from 'react';

const TextDisplay = ({name, label, value}) => {
  let wrapperClass = '';

  return (
    <span className={wrapperClass}>
        <span>{label} : </span>
        <span>{value}</span>
    </span>
  );
};

TextDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default TextDisplay;
