import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
  let currScreenWidth;

  useEffect(() => {
    currScreenWidth = document.getElementById('id-home').clientWidth;
    console.log(currScreenWidth);
  }, [])

  return (
    <div>
      <div className="Home" id="id-home">
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
          <div className="home-buttons">
            <div>
              <Link to="/gaming" className="home-button">
                Gaming
              </Link>
            </div>
            <div>
              <Link to="/events" className="home-button">
                Events
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {
          (
            <div className="home-extra-container">
              <div className="home-extra-section gaming">
                <div className="overlay">
                  Gaming
                </div>
              </div>
              <div className="home-extra-section events">
                Events
              </div>
            </div>
          )
        }
      </div> */}

    </div>
  );
}


Home.propTypes = {};

Home.defaultProps = {};
