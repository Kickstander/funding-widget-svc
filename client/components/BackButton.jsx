import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const BackButton = (props) => {
  const { clickToBack } = props;

  return <button type="button" className={style.backingButton} onClick={clickToBack}>Back this Campaign</button>;
};

BackButton.propTypes = {
  clickToBack: PropTypes.func.isRequired,
};

export default BackButton;
