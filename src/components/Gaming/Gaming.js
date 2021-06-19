import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Gaming.scss';
import { fetchGamingListAsync, selectGamingList } from '../../features/gaming/gamingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Launch, BookmarkBorder, Bookmark, ArrowDownward } from '@material-ui/icons';
import { addBookmark, closeWarning, removeBookmark, selectBookmarks, selectShowDuplicateWarning } from '../../features/bookmarks/bookmarksSlice';
import { closeSnackbar, openSnackbar } from '../../features/globalSnackbar/globalSnackbarSlice';

export default function Gaming() {
  const gamingList = useSelector(selectGamingList);
  const showDuplicateWarning = useSelector(selectShowDuplicateWarning);
  const savedBookmarks = useSelector(selectBookmarks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGamingListAsync('json/gaming.json'));
  }, []);

  let bookmarkIcon = (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);

  const handleClickBookmark = (bookmarkObj) => {
    if (savedBookmarks.find(bkMark => bkMark.id === bookmarkObj.id)) {
      dispatch(removeBookmark(bookmarkObj.id));
      dispatch(openSnackbar({
        open: true,
        message: 'Bookmark removed!',
        type: 'success',
        duration: 7000
      }));
    } else {
      dispatch(addBookmark(bookmarkObj));
      dispatch(openSnackbar({
        open: true,
        message: 'Bookmark saved!',
        type: 'success',
        duration: 7000
      }));
    }
  }

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  }

  return (
    <div className="gaming">

      <div className="gaming-landing">
        <div className="gaming-title"
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div className="gaming-heading">
            Gaming
          </div>
          <div className="gaming-sub-heading">
            The source for Black/POC gaming news
          </div>
        </div>

        <div className="see-more-container">
          <button className="see-more-button">
            See more
            {/* <ArrowDownward fontSize="small" /> */}
          </button>
        </div>
      </div>

      <div className="game-card-preview-container">
        {

          gamingList.map((card, index) => {

            bookmarkIcon = savedBookmarks.find(bkMark => bkMark.id === card.id) ?
              (<Bookmark style={{ fill: 'ghostwhite' }} />) : (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);

            return (
              <div key={'card_' + index} className="game-card-preview">
                <span className="bookmark-icon" onClick={() => handleClickBookmark(card)}>
                  <IconButton >
                    {bookmarkIcon}
                  </IconButton>
                </span>
                <div className="game-card-title">
                  {card.title}
                </div>
                <div className="game-card-summary">
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

Gaming.propTypes = {};

Gaming.defaultProps = {};

