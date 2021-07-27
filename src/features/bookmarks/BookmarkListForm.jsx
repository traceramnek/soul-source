import React from 'react';
import './BookmarkListForm.scss';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { createBookmarkListAsync, selectBookmarkLists, selectBookmarks, updateBookmarkList, updateBookmarkListAsync } from '../profile/profileSlice';
import { closeDialog, openSnackbar } from '../../features/globalUIManager/globalUIManagerSlice';
import { isNullOrUndefined } from '../../util/utils';
import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        border: '2px solid ghostwhite',
        borderRadius: 5,
        width: 250
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
    const dispatch = useDispatch();
    const bookmarks = useSelector(selectBookmarks);
    const bookmarkLists = useSelector(selectBookmarkLists);
    let [listName, setListName] = useState('');
    let [bklist, setBkList] = useState({});

    let bookmarkArray;

    let newList;

    if (!isNullOrUndefined(props.isEdit) && props.isEdit) {

        newList = {
            id: bookmarkLists[props.listId].id,
            bookmarks: bookmarkLists[props.listId].bookmarks,
            title: bookmarkLists[props.listId].title
        }

        const keys = Object.keys(bookmarkLists[props.listId]);
        bookmarkArray = Object.entries(bookmarks).map(([key, value]) => {
            if (!keys.includes(key)) {
                return { value: value, label: value.title }
            }
            return {};
        });
    } else {
        bookmarkArray = Object.entries(bookmarks).map(([key, value]) => {
            return { value: value, label: value.title }
        });
        newList = {
            id: uuidv4(),
            bookmarks: {},
            title: ''
        };
    }

    const handleNameChange = (event) => {
        setListName(event.target.value);

        if (!isNullOrUndefined(props.isEdit) && props.isEdit) {
            newList = {
                ...newList,
                title: event.target.value,
            };
            dispatch(updateBookmarkList(newList))
        }
    };
    const handleMultiselectChange = (event) => {
        let tempBKs = {};
        event.forEach(elem => {
            tempBKs[elem.value.id] = elem.value;
        });

        if (!isNullOrUndefined(props.isEdit) && props.isEdit) {
            newList = {
                ...newList,
                bookmarks: tempBKs
            };
            dispatch(updateBookmarkList(newList))
        } else {
            setBkList(tempBKs);
        }

    };

    const handleCreateOrUpdateList = () => {
        if (!isNullOrUndefined(props.isEdit) && props.isEdit) {
            if (validateList(newList)) {
                dispatch(updateBookmarkListAsync(newList))
            }
        } else {
            newList = {
                ...newList,
                title: listName,
                bookmarks: bklist
            };
            if (validateList(newList)) {
                dispatch(createBookmarkListAsync(newList));
            }

        }

        handleClose();
    }

    const handleClose = () => {
        dispatch(closeDialog());
    };

    const validateList = (listToCheck) => {
        let isValid = true;

        if (isNullOrUndefined(listToCheck.title) || listToCheck.title === '') {
            dispatch(openSnackbar({
                snackbarOpen: true,
                message: `Your list needs a name!`,
                type: 'error',
                duration: 5000
            }));
            isValid = false;
        }

        if (isNullOrUndefined(listToCheck) || Object.keys(listToCheck.bookmarks).length < 1) {
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
                                    value={props.isEdit ? newList.title : listName}
                                    onChange={handleNameChange}
                                >
                                </input>
                            </div>

                            <div className="field-section">
                                <label>Bookmarks</label>
                                <Select className="bookmark-form-select"
                                    value={(props.isEdit) ? Object.entries(newList.bookmarks).map(([key, value]) => {
                                        return { value: value, label: value.title }
                                    }) : Object.entries(bklist).map(([key, value]) => {
                                        return { value: value, label: value.title }
                                    })}
                                    closeMenuOnSelect="false"
                                    isMulti
                                    placeholder="Add bookmarks..."
                                    styles={customStyles}
                                    components={animatedComponents}
                                    options={bookmarkArray}
                                    onChange={handleMultiselectChange} />
                            </div>

                            <div className="bkList-form-buttons">
                                <div className="cancel-button" onClick={handleClose}>
                                    Cancel
                                </div>
                                <div className="create-button" onClick={handleCreateOrUpdateList}>
                                    {props.isEdit ? 'Update List' : 'Create List'}
                                </div>
                            </div>

                        </form>
                    </div>


                }
            </div>
        </div>
    );

}