import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const BackButton = (props) => {
  const { clickToBack } = props;

  return <a className={style.backingButton} href="#" onClick={clickToBack}>Back this Campaign</a>;
};

BackButton.propTypes = {
  clickToBack: PropTypes.func.isRequired,
};

export default BackButton;
