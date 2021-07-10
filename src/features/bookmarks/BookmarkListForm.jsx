import React from 'react';
import './BookmarkListForm.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { removeBookmark, removeBookmarkAsync, selectBookmarks, } from '../profile/profileSlice';
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
    menu: (provided, state) => ({
        backgroundColor: 'transparent'
    }),
    option: (provided, state) => ({
        backgroundColor: state.isFocused ? 'ghostwhite' : 'transparent',
        color: state.isFocused ? '#333' : 'ghostwhite',
        padding: '2px 8px'
    })
    // singleValue: (provided, state) => {
    //     const opacity = state.isDisabled ? 0.5 : 1;
    //     const transition = 'opacity 300ms';

    //     return { ...provided, opacity, transition };
    // }
}

export default function BookmarkListForm() {
    const bookmarks = useSelector(selectBookmarks);
    const bookmarkArray = Object.entries(bookmarks).map(([key, value]) => {
        return { value: value, label: value.title }
    });
    const [listName, setListName] = useState('');
    const newList = {};
    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        setListName(event.target.value);
    };
    const handleMultiselectChange = (newArr) => {
        // newList = {};
        newArr.forEach(elem => {
            newList[elem.value.id] = elem.value
        });
    };

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
                                <div className="cancel-button">
                                    Cancel
                                </div>
                                <div className="create-button">
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