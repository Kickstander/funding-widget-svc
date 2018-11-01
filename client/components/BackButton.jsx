import React from 'react';
import PropTypes from 'prop-types';

const BackButton = (props) => {
  const { clickHandler } = props;

  return <button type="button" onClick={clickHandler}>Back this Campaign</button>;
};

BackButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default BackButton;
