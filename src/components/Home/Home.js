import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.scss';

export default function Home() {

  return (
    <div>
      <div className="Home" data-testid="Home">
        <div className="home-title">
          <div className="home-heading">
            Soul Source
          </div>
          <div className="home-sub-heading">
            The source for content that enriches the soul
          </div>
        </div>
      </div>

    </div>
  );
}


Home.propTypes = {};

Home.defaultProps = {};
