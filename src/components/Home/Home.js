import React from 'react';
import './Home.scss';

export default function Home() {

  return (
    <div>
      <div className="Home" data-testid="Home">
        <div className="home-title"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
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
