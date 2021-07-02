import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import BookmarkList from '../../features/bookmarks/BookmarkList';
import TextField from '@material-ui/core/TextField';

export default function Profile() {

  return (
    <div className="profile" data-testid="Profile">

      <div>

      </div>
      <div>
        <form noValidate autoComplete="off">
          <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>

        </form>
      </div>



      <BookmarkList />
    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
