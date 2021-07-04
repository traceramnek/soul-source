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

  const handleToggleChange = (event, newValue) => {
    setFilterValue(newValue);
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
          <RadioGroup row
            value={filterValue}
            onChange={handleToggleChange}>
            <FormControlLabel value={ALL_BOOKMARKS} control={<Radio />}
              aria-label="All Bookmarks"
              label="All Bookmarks"
              labelPlacement="end" />
            <FormControlLabel value={BOOKMARK_LISTS} control={<Radio />}
              aria-label="Bookmark Lists"
              label="Bookmark Lists"
              labelPlacement="end" />
          </RadioGroup>
        </div>

        {
          filterValue === ALL_BOOKMARKS && // if filter is all bookmarks, show this div
          (
            <div>
              <div className="profile-bookmark-title">Bookmarks</div>
              <BookmarkList />
            </div>
          )
        }

        {
          filterValue === BOOKMARK_LISTS &&
          (
            <div>
              <div className="profile-bookmark-title">Bookmark Lists</div>

            </div>
          )

        }

        {/* <div>
        <form noValidate autoComplete="off">
          <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>

        </form>
      </div> */}
      </div>

    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
