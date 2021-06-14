import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './UpcomingEvents.scss';
import { fetchEventsListAsync, selectEventsList } from '../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Launch, AddCircle } from '@material-ui/icons';
import { addBookmark } from '../../features/bookmarks/bookmarksSlice';

export default function UpcomingEvents() {
  const eventsList = useSelector(selectEventsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsListAsync('json/events.json'));
  }, []);

  const handleClick = (bookmarkObj) => {
    console.log(bookmarkObj);
    dispatch(addBookmark(bookmarkObj));
  }

  return (
    <div>

      <div className="events-landing">
        <div className="events-title">
          <div className="events-heading">
            Events
          </div>
          <div className="events-sub-heading">
            Upcoming events for Black and POC gamers and developers
          </div>
        </div>
      </div>

      <div className="card-preview-container">
        {
          eventsList.map((card, index) => (
            <div key={'card_' + index} className="card-preview">
              <span className="add-bookmark-icon" onClick={() => handleClick(card)}>
                <AddCircle />
              </span>
              <div className="card-title">
                {card.title}
              </div>
              <div className="card-summary">
                {card.summary}
              </div>
              <a href={card.url} target="_blank">Check it out</a> <Launch />
            </div>
          ))
        }
      </div>

    </div>
  );
}

UpcomingEvents.propTypes = {};

UpcomingEvents.defaultProps = {};

