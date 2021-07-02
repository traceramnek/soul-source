import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import BookmarkList from '../../features/bookmarks/BookmarkList';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { selectCurrentprofile } from '../../features/profile/profileSlice';

export default function Profile() {
  const profile = useSelector(selectCurrentprofile);

  return (
    <div className="profile" data-testid="Profile">

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
        <h2 style={{ marginLeft: 15}}> Bookmarks</h2>
        <BookmarkList />
      </div>
      {/* <div>
        <form noValidate autoComplete="off">
          <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>

        </form>
      </div> */}
    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
