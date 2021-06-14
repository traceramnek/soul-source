import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookmarkList.scss';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {RemoveCircle} from '@material-ui/icons';

import { removeBookmark, closeWarning, selectBookmarks, selectShowDuplicateWarning } from '../../features/bookmarks/bookmarksSlice';
import { fetchBookmarksAsync } from './bookmarksSlice';

export default function BookmarkList() {
    const bookmarks = useSelector(selectBookmarks);
    const showDuplicateWarning = useSelector(selectShowDuplicateWarning);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBookmarksAsync('json/bookmarks.json'));
    }, []);

    const handleClose = () => {
        dispatch(closeWarning);
    }

    return (
        <div>
            <div>
                {
                    bookmarks.map((bookmark, index) => (
                        <div>
                            <div>
                                {bookmark.title}
                            </div>
                            <div>
                                {bookmark.summary}
                            </div>
                        </div>

                    ))
                }
            </div>

            <Snackbar open={showDuplicateWarning} autoHideDuration={8000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    );

}

BookmarkList.propTypes = {};

BookmarkList.defaultProps = {};