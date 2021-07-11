import React from 'react';
import './BookmarkListForm.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


import { createBookmarkListAsync, removeBookmark, removeBookmarkAsync, selectBookmarks, } from '../profile/profileSlice';
import { Cancel, CancelOutlined, Launch } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';
import { TextField, Input, InputLabel, MenuItem, Chip, FormControl } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        border: '2px solid ghostwhite',
        borderRadius: 5,
        width: 300
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        backgroundColor: 'transparent',
        display: 'flex'
    }),
    menuList: (provided, state) => ({
        ...provided,
        zIndex: 5,
        maxHeight: 100,
        backgroundColor: '#a31455'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'ghostwhite' : 'transparent',
        color: state.isFocused ? '#a31455' : 'ghostwhite',
        padding: '2px 8px'
    })
}

export default function BookmarkListForm(props) {
    const bookmarks = useSelector(selectBookmarks);
    const bookmarkArray = Object.entries(bookmarks).map(([key, value]) => {
        return { value: value, label: value.title }
    });
    const [listName, setListName] = useState('');
    let newList = {
        id: uuidv4(),
        bookmarks: {}
    };
    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        setListName(event.target.value);
    };
    const handleMultiselectChange = (newArr) => {
        // newList = {};
        newArr.forEach(elem => {
            newList.bookmarks[elem.value.id] = elem.value
        });
    };

    const handleCreateList = () => {
        if (validateList()) {
            newList = {
                ...newList,
                title: listName,
            };

            dispatch(createBookmarkListAsync(newList));
            // console.log(newList);
            props.handleClose();
        }

    }

    const validateList = () => {
        let isValid = true;

        if (isNullOrUndefined(listName) || listName === '') {
            dispatch(openSnackbar({
                snackbarOpen: true,
                message: `Your list needs a name!`,
                type: 'error',
                duration: 5000
            }));
            isValid = false;
        }

        if (isNullOrUndefined(newList) || Object.keys(newList.bookmarks).length < 1) {
            dispatch(openSnackbar({
                snackbarOpen: true,
                message: `Your list must contain at least one bookmark!`,
                type: 'error',
                duration: 5000
            }));
            isValid = false;
        }

        return isValid;
    }

    return (
        <div>
            <div className="form-title">
                <label>Create Bookmark List</label>
            </div>
            <div className="bookmark-form-container">
                {!isNullOrUndefined(bookmarks) &&
                    <div>

                        <form noValidate autoComplete="off">
                            <div className="field-section">
                                <label>List Name</label>
                                <input className="bookmark-form-input"
                                    placeholder="List Name"
                                    onChange={handleNameChange}
                                >
                                </input>
                            </div>

                            <div className="field-section">
                                <label>Bookmarks</label>
                                <Select className="bookmark-form-select"
                                    isMulti
                                    placeholder="Select bookmarks..."
                                    styles={customStyles}
                                    components={animatedComponents}
                                    options={bookmarkArray}
                                    onChange={handleMultiselectChange} />
                            </div>

                            <div className="bkList-form-buttons">
                                <div className="cancel-button" onClick={props.handleClose}>
                                    Cancel
                                </div>
                                <div className="create-button" onClick={handleCreateList}>
                                    Create List
                                </div>
                            </div>

                        </form>
                    </div>


                }
            </div>
        </div>
    );

}