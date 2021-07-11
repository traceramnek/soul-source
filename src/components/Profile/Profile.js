import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import BookmarkList from '../../features/bookmarks/BookmarkList';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useSelector } from 'react-redux';
import { selectCurrentprofile } from '../../features/profile/profileSlice';
import { ALL_BOOKMARKS, BOOKMARK_LISTS } from '../../util/constants';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Fab, Dialog, Tooltip } from '@material-ui/core';
import BookmarkListForm from '../../features/bookmarks/BookmarkListForm';
import AddIcon from '@material-ui/icons/Add';
import BookmarkItem from '../../features/bookmarks/BookmarkItem';
import { isNullOrUndefined } from '../../util/utils';


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
  const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(selectCurrentprofile);
  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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

        {
          filterValue === ALL_BOOKMARKS && // if filter is all bookmarks, show this div
          (
            <div>
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

        {
          filterValue === BOOKMARK_LISTS &&
          (
            <div>
              {!isNullOrUndefined(profile.bookmarkLists) &&
                  Object.entries(profile.bookmarkLists).map(([id, bookmarkList], index) => (
                    <BookmarkList bookmarkList={bookmarkList} />
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
              <Dialog open={dialogOpen} onClose={handleClose}>
                <BookmarkListForm handleClose={handleClose} />
              </Dialog>

            </div>
          )

        }
      </div>

    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
