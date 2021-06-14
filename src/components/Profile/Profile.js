import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import BookmarkList from '../../features/bookmarks/BookmarkList';

export default function Profile() {

  return (
    <div className="Profile" data-testid="Profile">
      <BookmarkList/>
    </div>
  )

};

Profile.propTypes = {};

Profile.defaultProps = {};
