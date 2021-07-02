import React from 'react';
import './BookmarkList.scss';
import { useSelector, useDispatch } from 'react-redux';

import { removeBookmark, selectBookmarks, } from '../profile/profileSlice';
import { Cancel, CancelOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { openSnackbar } from '../../features/globalSnackbar/globalSnackbarSlice';


export default function BookmarkList() {
    const bookmarks = useSelector(selectBookmarks);
    const dispatch = useDispatch();
    let hovering = false;

    const removeIcon = <CancelOutlined style={{ color: 'ghostwhite' }} />;
    const removeIconHover = <Cancel style={{ color: 'ghostwhite' }} />;

    const handleRemoveBookmark = (bookmarkObj) => {
        if (bookmarks.find(bkMark => bkMark.id === bookmarkObj.id)) {
            dispatch(removeBookmark(bookmarkObj.id));
            dispatch(openSnackbar({
                open: true,
                message: `${bookmarkObj.title} removed from bookmarks!`,
                type: 'success',
                duration: 7000
            }));
        }
    }

    const handleHover = (value) => {
        hovering = value;
    }


    return (
        <div>
            <div className="bookmark-container">
                {
                    bookmarks.map((bookmark, index) => (
                        <div className="bookmark" key={'bookmark_' + index} 
                            data-aos="fade-right"
                            data-aos-delay="250"
                            data-aos-easing="ease-in-out"
                            data-aos-once="true">
                            <span className="remove-icon" onClick={() => handleRemoveBookmark(bookmark)}>
                                <IconButton
                                 onMouseEnter={ () => handleHover(true) }
                                 onMouseLeave={ () => handleHover(false) }
                                 >
                                    {hovering ? removeIcon : removeIconHover}
                                </IconButton>
                            </span>
                            <div className="bookmark-title">
                                {bookmark.title}
                            </div>
                            <div className="bookmark-summary"> 
                                {bookmark.summary}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );

}