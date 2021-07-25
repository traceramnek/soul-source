import React from 'react';
import './BookmarkItem.scss';
import { useDispatch } from 'react-redux';
import { removeBookmarkAsync } from '../profile/profileSlice';
import { Cancel, CancelOutlined, Launch } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { openSnackbar } from '../globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmModal from '../globalUIManager/confimModal/ConfirmModal';
import { useState } from 'react';

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

export default function BookmarkItem(props) {
    const bookmark = props.bookmark;
    const dispatch = useDispatch();
    let hovering = false;
    const classes = useStyles();

    const removeIcon = <CancelOutlined style={{ color: 'ghostwhite' }} />;
    const removeIconHover = <Cancel style={{ color: 'ghostwhite' }} />;

    const [confirmProps, setConfirmProps] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleConfirmRemove = (bookmark) => {
        setConfirmProps({
            title: 'Confirm Removal',
            text: `Removing this bookmark will remove it from all bookmark lists it currently belnongs to. Do you still want to remove this bookmark?`,
            cancelLabel: 'Cancel',
            proceedLabel: 'Remove',
            handleClose: handleCloseConfirm,
            handleProceed: handleRemoveBookmark,
            extraData: {
                bookmark: bookmark
            }
        });

        setConfirmOpen(true);
    }

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    }

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

        handleCloseConfirm();
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

                <Tooltip arrow classes={classes} title="Remove Bookmark" placement="top">
                    <span className="remove-icon" onClick={() => handleConfirmRemove(bookmark.id)}>
                        <IconButton
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                        >
                            {hovering ? removeIcon : removeIconHover}
                        </IconButton>
                    </span>
                </Tooltip>
                <span className="launch-icon" title={bookmark.title} >
                    <a href={bookmark.url} target="_blank" rel="noreferrer">
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

            {confirmOpen &&
                <ConfirmModal open={confirmOpen} {...confirmProps} />
            }

        </div>
    );

}