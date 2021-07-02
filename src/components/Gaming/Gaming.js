import React, { useEffect } from 'react';
import './Gaming.scss';
import { fetchGamingListAsync, selectGamingList } from '../../features/gaming/gamingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Launch, BookmarkBorder, Bookmark } from '@material-ui/icons';
import { addBookmark, removeBookmark, selectBookmarks } from '../../features/profile/profileSlice';
import { openSnackbar } from '../../features/globalSnackbar/globalSnackbarSlice';
import { selectIsLoggedIn } from "../../features/login/loginSlice";


export default function Gaming() {
  const gamingList = useSelector(selectGamingList);
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const savedBookmarks = useSelector(selectBookmarks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGamingListAsync('json/gaming.json'));
  }, []);

  let bookmarkIcon = (<BookmarkBorder style={{ fill: 'ghostwhite' }} />);
  let bookmarkSpan = (<span></span>);

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
              <div key={'card_' + index} className="game-card-preview">
                {bookmarkSpan}
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

