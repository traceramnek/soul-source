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
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';


export default function Profile() {
  const [filterValue, setFilterValue] = useState(ALL_BOOKMARKS);
  const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(selectCurrentprofile);

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
            Bookmarks
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
              <BookmarkList />
            </div>
          )
        }

        {
          filterValue === BOOKMARK_LISTS &&
          (
            <div>
              <h4>Temp List</h4>
            </div>
          )

        }
      </div>

    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
