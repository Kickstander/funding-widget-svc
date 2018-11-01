import React from 'react';
import PropTypes from 'prop-types';

const BackButton = (props) => {
  const { clickToBack } = props;

  return <button type="button" onClick={clickToBack}>Back this Campaign</button>;
};

BackButton.propTypes = {
  clickToBack: PropTypes.func.isRequired,
};

export default BackButton;
