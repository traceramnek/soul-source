import React, { useEffect } from 'react';
import './UpcomingEvents.scss';
import { fetchEventsListAsync, selectEventsList } from '../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Launch, BookmarkBorder, Bookmark } from '@material-ui/icons';
import { addBookmarkAsync, selectBookmarks, removeBookmarkAsync } from '../../features/profile/profileSlice';
import { selectIsLoggedIn } from '../../features/login/loginSlice';
import { openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { IconButton } from '@material-ui/core';
import { isNullOrUndefined } from '../../util/utils';

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
    if (!isNullOrUndefined(savedBookmarks) && savedBookmarks[bookmarkObj.id]) {
      dispatch(removeBookmarkAsync(bookmarkObj.id));
      dispatch(openSnackbar({
        snackbarOpen: true,
        message: `${bookmarkObj.title} removed from bookmarks!`,
        type: 'success',
        duration: 7000
      }));
    } else {
      dispatch(addBookmarkAsync(bookmarkObj));
      dispatch(openSnackbar({
        snackbarOpen: true,
        message: `${bookmarkObj.title} saved to bookmarks!`,
        type: 'success',
        duration: 7000
      }));
    }
  }


  return (
    <div className="upcoming-events">

      <div className="landing">
        <div className="title"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div className="heading">
            Events
          </div>
          <div className="sub-heading">
            Upcoming events for Black/POC gamers and developers
          </div>
        </div>

        <div className="see-more-container">
          <button className="see-more-button">
            See more
            {/* <ArrowDownward fontSize="small" /> */}
          </button>
        </div>

      </div>

      <div className="card-preview-container">
        {
          eventsList.map((card, index) => {

            bookmarkIcon = (!isNullOrUndefined(savedBookmarks) && savedBookmarks[card.id]) ?
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
                <div className="row">
                  <div className="col-md-9">
                    <div className="card-title">
                      {card.title}
                    </div>
                    <div className="card-summary">
                      {card.summary}
                    </div>
                  </div>
                  <div className="check-it-out-container col-md-3">
                    <a className="check-it-out-button" href={card.url} target="_blank" rel="noreferrer">
                      <span>Check it out</span>
                      <Launch fontSize="small" />
                    </a>
                  </div>
                </div>

              </div>
            )

          })
        }
      </div>

    </div>
  );
}

