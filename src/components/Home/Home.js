import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.scss';

export default function Home() {

  return (
    <div className="Home" data-testid="Home">
      <div className="home-title">
        Soul Source
      </div>
    </div>
  );
}


Home.propTypes = {};

Home.defaultProps = {};
