import React, { useState } from 'react';
import './Profile.scss';
import BookmarkList from '../../features/bookmarks/BookmarkList';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentprofile, selectBookmarks } from '../../features/profile/profileSlice';
import { ALL_BOOKMARKS, BOOKMARK_LISTS } from '../../util/constants';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BookmarkItem from '../../features/bookmarks/BookmarkItem';
import { isNullOrUndefined } from '../../util/utils';
import { openSnackbar, openDialog } from '../../features/globalUIManager/globalUIManagerSlice';


const useStyles = makeStyles(() => ({
  arrow: {
    color: 'ghostwhite',
  },
  tooltip: {
    backgroundColor: 'ghostwhite',
    color: '#a31455',
    fontWeight: 700,
    fontSize: 14
  },
}));

export default function Profile() {
  const [filterValue, setFilterValue] = useState(ALL_BOOKMARKS);
  // const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(selectCurrentprofile);
  const bookmarks = useSelector(selectBookmarks);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleOpenDialog = () => {
    if (!isNullOrUndefined(bookmarks) && Object.keys(bookmarks).length > 0) {
      dispatch(openDialog({
        componentToLoad: 'BookmarkListForm',
        dialogProps: {
          isEdit: false
        }
      }));
    } else {
      dispatch(openSnackbar({
        open: true,
        message: `You need some bookmarks before you can create a bookmark list!`,
        type: 'warning',
        duration: 7000
      }));
    }
  };

  const handleToggleChange = (newValue) => {
    if (newValue !== filterValue) {
      setFilterValue(newValue);
    }
  }

  return (
    <div className="profile" data-testid="Profile">
      <div className="overlay">
        <div
          data-aos="fade-right"
          data-aos-delay="250"
          data-aos-easing="ease-in-out"
          data-aos-once="true">
          <div className="user-name">
            {profile.name}
          </div>
        </div>

        <div>
          <span className={"profile-option " + (filterValue === ALL_BOOKMARKS ? 'active' : 'non-active')}
            onClick={() => handleToggleChange(ALL_BOOKMARKS)} >
            All Bookmarks
          </span>
          <span className="profile-option"> | </span>
          <span className={"profile-option " + (filterValue === BOOKMARK_LISTS ? 'active' : 'non-active')}
            onClick={() => handleToggleChange(BOOKMARK_LISTS)} >
            Bookmark Lists
          </span>
        </div>

        {filterValue === ALL_BOOKMARKS && // if filter is all bookmarks, show this div
          (
            <div>
              <div>
                {Object.keys(profile.bookmarks).length} bookmarks
              </div>

              <div className="bookmark-container">
                {!isNullOrUndefined(profile.bookmarks) &&
                  Object.entries(profile.bookmarks).map(([id, bookmark], index) => (
                    <BookmarkItem key={'bk_' + index} bookmark={bookmark} />
                  ))
                }
              </div>

            </div>
          )
        }

        {filterValue === BOOKMARK_LISTS &&
          (
            <div>
              {!isNullOrUndefined(profile.bookmarkLists) &&
                Object.entries(profile.bookmarkLists).map(([id, bookmarkList], index) => (
                  <BookmarkList key={'bkl' + index}
                    bookmarkList={bookmarkList}
                    handleOpenDialog={handleOpenDialog} />
                ))
              }


              <div className="fab-button">
                <Tooltip arrow classes={classes}
                  title="Create Bookmark List"
                  placement="left">
                  <Fab style={{ backgroundColor: 'ghostwhite', color: '#a31455' }}
                    aria-label="Create Bookmark List"
                    onClick={() => handleOpenDialog()}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </div>

            </div>
          )}
      </div>
    </div>
  )
};
