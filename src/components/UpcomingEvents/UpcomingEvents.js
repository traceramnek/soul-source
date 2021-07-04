import React, { useEffect } from 'react';
import './UpcomingEvents.scss';
import { fetchEventsListAsync, selectEventsList } from '../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Launch, BookmarkBorder, Bookmark } from '@material-ui/icons';
import { addBookmark, removeBookmark, selectBookmarks } from '../../features/profile/profileSlice';
import { selectIsLoggedIn } from '../../features/login/loginSlice';
import { openSnackbar } from '../../features/globalSnackbar/globalSnackbarSlice';
import { IconButton } from '@material-ui/core';
import { EVENTS_URL } from '../../util/constants';

export default function UpcomingEvents() {
  const eventsList = useSelector(selectEventsList);
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const savedBookmarks = useSelector(selectBookmarks);
  const dispatch = useDispatch();

  let bookmarkIcon = (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);
  let bookmarkSpan = (<span></span>);

  useEffect(() => {
    dispatch(fetchEventsListAsync());
  }, []);

  const handleClickBookmark = (bookmarkObj) => {
    if (savedBookmarks.find(bkMark => bkMark.id === bookmarkObj.id)) {
      dispatch(removeBookmark(bookmarkObj.id));
      dispatch(openSnackbar({
        open: true,
        message: `${bookmarkObj.title} removed from bookmarks!`,
        type: 'success',
        duration: 7000
      }));
    } else {
      dispatch(addBookmark(bookmarkObj));
      dispatch(openSnackbar({
        open: true,
        message: `${bookmarkObj.title} saved to bookmarks!`,
        type: 'success',
        duration: 7000
      }));
    }
  }


  return (
    <div className="upcoming-events">

      <div className="events-landing">
        <div className="events-title"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div className="events-heading">
            Events
          </div>
          <div className="events-sub-heading">
            Upcoming events for Black/POC gamers and developers
          </div>
        </div>
      </div>

      <div className="card-preview-container">
        {
          eventsList.map((card, index) => {

            bookmarkIcon = savedBookmarks.find(bkMark => bkMark.id === card.id) ?
              (<Bookmark style={{ fill: 'ghostwhite' }} />) : (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);

            if (isLoggedIn) {
              bookmarkSpan = (
                <span className="bookmark-icon" onClick={() => handleClickBookmark(card)}>
                  <IconButton >
                    {bookmarkIcon}
                  </IconButton>
                </span>
              )
            } else {
              bookmarkSpan = (
                <span></span>
              );
            }
            return (
              <div key={'card_' + index} className="card-preview">
              {bookmarkSpan}
              <div className="card-title">
                {card.title}
              </div>
              <div className="card-summary">
                {card.summary}
              </div>
              <a href={card.url} target="_blank">Check it out</a> <Launch fontSize="small" />
            </div>
            )
        
          })
        }
      </div>

    </div>
  );
}

