import React, { useEffect } from 'react';
import './Gaming.scss';
import { fetchGamingListAsync, selectGamingList, toggleShowFullSummary, selectGamingLoading } from '../../features/gaming/gamingSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  IconButton } from '@material-ui/core';
import { Launch, BookmarkBorder, Bookmark } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { addBookmarkAsync, removeBookmarkAsync, selectBookmarks } from '../../features/profile/profileSlice';
import { openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { isNullOrUndefined, scrollElemIntoView } from '../../util/utils';

export default function Gaming() {
  const gamingList = useSelector(selectGamingList);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const gamingLoading = useSelector(selectGamingLoading);
  const savedBookmarks = useSelector(selectBookmarks);

  const dispatch = useDispatch();

  const handleToggleText = (index) => {
    dispatch(toggleShowFullSummary(index))
  }

  useEffect(() => {
    dispatch(fetchGamingListAsync());
  }, []);

  let bookmarkIcon = (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);
  let bookmarkSpan = (<span></span>);

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

  const handleScrollIntoView = (id) => {
    scrollElemIntoView(id);
  }

  return (
    <div className="gaming">

      <div className="landing">
        <div className="title"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div className="heading">
            Gaming
          </div>
          <div className="sub-heading">
            The source for Black/POC gaming news
          </div>
        </div>

        <div className="see-more-container">
          <button className="see-more-button" onClick={() => handleScrollIntoView('gaming-previews')}>
            Explore
            {/* <ArrowDownward fontSize="small" /> */}
          </button>
        </div>
      </div>

      <div id="gaming-previews" className="card-preview-container">
      {gamingLoading &&
          <div>
            <div key="card_temp_1" className="card-preview">
              <Skeleton variant="text" width={'85%'} height={100} />
              <br></br>
              <Skeleton variant="rect" width={'75%'} height={225} />
            </div>
            <div key="card_temp_2" className="card-preview">
              <Skeleton variant="text" width={'85%'} height={100} />
              <Skeleton variant="rect" width={'75%'} height={225} />
            </div>
          </div>

        }
        { !gamingLoading &&
        !isNullOrUndefined(gamingList) &&

          gamingList.map((card, index) => {

            const shortSummary = card.summary.substr(0, 200) + '...';
            const longSummary = card.summary;

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
                    <div className="card-summary" onClick={() => handleToggleText(index)}>
                      {card.showFullSummary ? longSummary : shortSummary}
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

