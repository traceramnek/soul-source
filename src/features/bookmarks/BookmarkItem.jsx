import React from 'react';
import './BookmarkItem.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { removeBookmark, removeBookmarkAsync, selectBookmarks, } from '../profile/profileSlice';
import { Cancel, CancelOutlined, Launch } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { openSnackbar } from '../globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';


export default function BookmarkItem(props) {
    const bookmark = props.bookmark;
    const dispatch = useDispatch();
    let hovering = false;

    const removeIcon = <CancelOutlined style={{ color: 'ghostwhite' }} />;
    const removeIconHover = <Cancel style={{ color: 'ghostwhite' }} />;

    const handleRemoveBookmark = () => {
        if (!isNullOrUndefined(bookmark) && bookmark.id) {
            dispatch(removeBookmarkAsync(bookmark.id));
            dispatch(openSnackbar({
                open: true,
                message: `${bookmark.title} removed from bookmarks!`,
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

            <div className="bookmark" key={'bookmark_' + bookmark.id}
                data-aos="fade-right"
                data-aos-delay="250"
                data-aos-easing="ease-in-out"
                data-aos-once="true">
                <span className="remove-icon" title="Remove Bookmark" onClick={() => handleRemoveBookmark(bookmark)}>
                    <IconButton
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                    >
                        {hovering ? removeIcon : removeIconHover}
                    </IconButton>
                </span>
                <span className="launch-icon" title={bookmark.title} >
                    <a className="nav-link" href={bookmark.url} target="_blank">
                        <Launch style={{ color: 'ghostwhite' }} />
                    </a>
                </span>
                <div className="bookmark-title">
                    {bookmark.title}
                </div>
                <div className="bookmark-summary">
                    {bookmark.summary}
                </div>
            </div>


        </div>
    );

}