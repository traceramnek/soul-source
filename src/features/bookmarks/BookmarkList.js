import React from 'react';
import './BookmarkList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmarkListAsync, selectBookmarks } from '../profile/profileSlice';
import { Launch, Edit, Delete } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { closeDialog, openDialog, openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';
import { makeStyles } from '@material-ui/core/styles';

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

export default function BookmarkList(props) {
    const bookmarkList = props.bookmarkList;
    const bookmarks = useSelector(selectBookmarks);
    const dispatch = useDispatch();
    const classes = useStyles();


    const handleRemoveBookmarkList = () => {
        if (!isNullOrUndefined(bookmarkList)) {
            dispatch(removeBookmarkListAsync(bookmarkList.id));
            dispatch(openSnackbar({
                open: true,
                message: `${bookmarkList.title} removed from your lists!`,
                type: 'success',
                duration: 7000
            }));
        }
    }

    const handleOpenDialog = () => {
        if (!isNullOrUndefined(bookmarks) && Object.keys(bookmarks).length > 0) {
            dispatch(openDialog({
                componentToLoad: 'BookmarkListForm',
                dialogProps: {
                    isEdit: true,
                    listId: bookmarkList.id,
                }
            }))
        } else {
            dispatch(openSnackbar({
                open: true,
                message: `You need some bookmarks before you can create a bookmark list!`,
                type: 'warning',
                duration: 7000
            }));
        }
    };

    const handleClose = () => {
        dispatch(closeDialog());
    };

    return (
        <div>
            <div className="bookmark-list-container"
                data-aos="fade-right"
                data-aos-delay="250"
                data-aos-easing="ease-in-out"
                data-aos-once="true">
                <div className="bookmark-list-title">
                    {bookmarkList.title}
                    <Tooltip arrow classes={classes} title="Edit List" placement="top">
                        <span className="edit-icon" onClick={() => handleOpenDialog()}>
                            <span> <Edit style={{ color: '#a31455' }} /> </span>
                        </span>
                    </Tooltip>
                    <Tooltip arrow classes={classes} title="Delete List" placement="top">
                        <span className="delete-icon" onClick={() => handleRemoveBookmarkList()}>
                            <span> <Delete style={{ color: '#a31455' }} /> </span>
                        </span>
                    </Tooltip>
                </div>

                {!isNullOrUndefined(bookmarkList.bookmarks) &&
                    Object.entries(bookmarkList.bookmarks).map(([id, bookmark], index) => (
                        <div key={'bookmark_list_' + index}>
                            <div className={"bookmark-list-item " + (index === Object.keys(bookmarkList.bookmarks).length - 1 ? 'no-border-bottom' : '')}
                            >
                                <span className="launch-icon right" title={bookmark.title} >
                                    <a className="nav-link" href={bookmark.url} target="_blank" rel="noreferrer">
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

            {/* <Dialog open={dialogOpen} onClose={handleClose}>
                <BookmarkListForm isEdit={true} listId={bookmarkList.id} handleClose={handleClose} />
            </Dialog> */}
        </div >
    );

}