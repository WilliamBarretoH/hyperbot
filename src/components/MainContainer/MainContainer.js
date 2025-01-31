import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainContainer.module.css';

const MainContainer = ({ children }) => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className={`col-12 col-md-6 p-4 position-relative ${styles.homeContainer}`}>
      {children}
    </div>
  </div>
);

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

MainContainer.defaultProps = {};

export default MainContainer;