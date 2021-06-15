import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Gaming.scss';
import { fetchGamingListAsync, selectGamingList } from '../../features/gaming/gamingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Launch, AddCircle, RemoveCircle, BookmarkBorder, Bookmark, ArrowDownward } from '@material-ui/icons';
import { addBookmark, closeWarning, selectShowDuplicateWarning } from '../../features/bookmarks/bookmarksSlice';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function Gaming() {
  const gamingList = useSelector(selectGamingList);
  const showDuplicateWarning = useSelector(selectShowDuplicateWarning);
  let isOpen = showDuplicateWarning;

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchGamingListAsync('json/gaming.json'));
  }, []);

  const handleClick = (bookmarkObj) => {
    console.log(bookmarkObj);
    dispatch(addBookmark(bookmarkObj));
  }

  const handleCloseSnackbar = () => {
    dispatch(closeWarning);
  }

  return (
    <div>

      <div className="gaming-landing">
        <div className="gaming-title">
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
          gamingList.map((card, index) => (
            <div key={'card_' + index} className="game-card-preview"
              data-aos="slide-right"
              data-aos-easing="ease-in-out"
              data-aos-once="true">
              <span className="add-bookmark-icon" onClick={() => handleClick(card)}>
                <IconButton>
                  <BookmarkBorder />
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
          ))
        }
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showDuplicateWarning} autoHideDuration={8000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning">
          This item has already been bookmarked!
        </Alert>
      </Snackbar>
    </div>
  );
}

Gaming.propTypes = {};

Gaming.defaultProps = {};

