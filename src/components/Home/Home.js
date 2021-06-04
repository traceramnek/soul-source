import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

export default Home = () =>  {
  return (
    <div className={styles.Home} data-testid="Home">
      Home Component
    </div>
  );
}


Home.propTypes = {};

Home.defaultProps = {};
