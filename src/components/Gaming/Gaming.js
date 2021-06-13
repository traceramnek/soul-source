import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Gaming.scss';
import { fetchGamingListAsync, selectGamingList } from '../../features/gaming/gamingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Launch, AddCircle, RemoveCircle } from '@material-ui/icons';
import { addBookmark } from '../../features/bookmarks/bookmarksSlice';

export default function Gaming() {
  const gamingList = useSelector(selectGamingList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGamingListAsync('json/gaming.json'));
  }, []);

  const handleClick = (bookmarkObj) => {
    console.log(bookmarkObj);
    dispatch(addBookmark(bookmarkObj));
  }

  return (
    <div>

      <div className="gaming-landing">
        <div className="gaming-title">
          <div className="gaming-heading">
            Gaming 
          </div>
          <div className="gaming-sub-heading">
            The source for Black and POC gaming news
          </div>
        </div>
      </div>

      <div className="card-preview-container">
        {
          gamingList.map((card, index) => (
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

Gaming.propTypes = {};

Gaming.defaultProps = {};

