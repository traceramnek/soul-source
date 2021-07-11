import React from 'react';
import './BookmarkList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { removeBookmark, removeBookmarkAsync, selectBookmarks, } from '../profile/profileSlice';
import { Cancel, CancelOutlined, Launch } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';


export default function BookmarkList(props) {
    const bookmarkList = props.bookmarkList;
    const dispatch = useDispatch();
    let hovering = false;

    const removeIcon = <CancelOutlined style={{ color: 'ghostwhite' }} />;
    const removeIconHover = <Cancel style={{ color: 'ghostwhite' }} />;

    const handleRemoveBookmarkList = (listObj) => {
        if (!isNullOrUndefined(bookmarkList) && bookmarkList[listObj.id]) {
            // dispatch(removeBookmarkListAsync(listObj.id));
            dispatch(openSnackbar({
                open: true,
                message: `${listObj.title} removed from your lists!`,
                type: 'success',
                duration: 7000
            }));
        }
    }

    return (
        <div>
            <div className="bookmark-list-container"
                data-aos="fade-right"
                data-aos-delay="250"
                data-aos-easing="ease-in-out"
                data-aos-once="true">
                <div className="bookmark-list-title">
                    {bookmarkList.title}
                </div>

                {!isNullOrUndefined(bookmarkList.bookmarks) &&
                    Object.entries(bookmarkList.bookmarks).map(([id, bookmark], index) => (
                        <div>
                            <div className="bookmark-list-item" key={'bookmark_' + index}
                            >
                                <span className="remove-icon" title="Remove Bookmark" onClick={() => handleRemoveBookmarkList(bookmark)}>
                                    <IconButton>
                                        {hovering ? removeIcon : removeIconHover}
                                    </IconButton>
                                </span>
                                <span className="launch-icon" title={bookmark.title} >
                                    <a className="nav-link" href={bookmark.url} target="_blank">
                                        <Launch style={{ color: 'ghostwhite' }} />
                                    </a>
                                </span>

                                <div className="bookmark-list-item-title">
                                    {bookmark.title}
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );

}