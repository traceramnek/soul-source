import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { firebaseDB } from '../../services/firebase';
import { isNullOrUndefined } from '../../util/utils';
import { closeLoader, openLoader } from '../globalUIManager/globalUIManagerSlice';
import { SoulSourceService } from '../../services/SoulSourceService';

const initialState = {
    currentProfile: {
        id: '',
        name: '',
        email: '',
        profilePicPath: '',
        bookmarks: {},
        bookmarkLists: {},
    },
    showDuplicateWarning: false,
    loading: false,
    hasError: false,
};

export const fetchProfileByIdAsync = createAsyncThunk(
    'profile/fetchProfileById',
    async (id, thunkAPI) => {
        // const data = await axios.get(`firebase/api/${id}`);
        // return data.data;

        thunkAPI.dispatch(openLoader('Fetching profile details...'));
        const user = SoulSourceService.fetchProfileById(id);
        thunkAPI.dispatch(closeLoader());

        return user;


    }
);

export const addBookmarkAsync = createAsyncThunk(
    'login/addBookmark',
    async (bookmarkObj, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Adding Bokmark...'));
        const profile = thunkAPI.getState().profile.currentProfile;
        SoulSourceService.addBookmark(profile, bookmarkObj);
        thunkAPI.dispatch(closeLoader());

        return bookmarkObj;

    }
);

export const removeBookmarkAsync = createAsyncThunk(
    'login/removeBookmark',
    async (id, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Removing Bokmark...'));
        const profile = thunkAPI.getState().profile.currentProfile;
        SoulSourceService.removeBookmark(profile, id);
        thunkAPI.dispatch(closeLoader());

        return id;
    }
);


export const createBookmarkListAsync = createAsyncThunk(
    'login/createBookmarkList',
    async (bkList, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Creating List...'));

        const profile = thunkAPI.getState().profile.currentProfile;

        if (profile.bookmarkLists) {
            if (profile.bookmarkLists[bkList.id]) {
                const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarkLists');
                const snapshot = await bookmarkRef.update({
                    [bkList.id]: bkList // add new bookmark list to db
                });
            }
        }

        const usersResp = firebaseDB.ref('users/' + profile.id);
        const snapshot = await usersResp.once('value');
        const user = snapshot.val();

        thunkAPI.dispatch(closeLoader());
        return bkList;

    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateCurrentProfile: (state, action) => {
            state.currentProfile.name = action.payload.name;
            state.currentProfile.email = action.payload.email;
            state.currentProfile.profilePicPath = action.payload.picture;
        },
        updateName: (state, action) => {
            if (action.payload !== '' && !isNullOrUndefined(action.payload)) {
                state.currentProfile = state.profiles[action.payload];
            } else {
                state.currentProfile = state.profiles[0];
            }
        },
        updateEmail: (state, action) => {
            if (action.payload !== null && action.payload !== '') {
                state.email = action.payload;
            }
        },
        updateProfilePic: (state, action) => {
            state.profilePicPath = action.payload;
        },
        addBookmark: (state, action) => { // payload should be a new bookmark object
            
        },
        removeBookmark: (state, action) => { // payload should be the id
            state.currentProfile.bookmarks = state.currentProfile.bookmarks.filter(bookmark => bookmark.id !== action.payload);
        },
        closeWarning: (state) => {
            state.showDuplicateWarning = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileByIdAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(fetchProfileByIdAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(fetchProfileByIdAsync.fulfilled, (state, action) => {
                state.currentProfile = action.payload;
                //set it to the first itme  in the list
                state.loading = false;
                state.hasError = false;
            })
            // Add bookmark
            .addCase(addBookmarkAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(addBookmarkAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(addBookmarkAsync.fulfilled, (state, action) => {
                if (state.currentProfile.bookmarks) {
                    if (!state.currentProfile.bookmarks[action.payload.id]) {
                        state.currentProfile.bookmarks[action.payload.id] = action.payload;
                    }
                } else {
                    state.currentProfile = {
                        ...state.currentProfile,
                        bookmarks: {
                            [action.payload.id]: action.payload
                        }
                    }
                }
            })
            .addCase(removeBookmarkAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(removeBookmarkAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(removeBookmarkAsync.fulfilled, (state, action) => {
                //delete bookmark obj
                delete state.currentProfile.bookmarks[action.payload];
            })
            .addCase(createBookmarkListAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(createBookmarkListAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(createBookmarkListAsync.fulfilled, (state, action) => {
                if (state.currentProfile.bookmarkLists) {
                    if (!state.currentProfile.bookmarkLists[action.payload.id]) {
                        state.currentProfile.bookmarkLists[action.payload.id] = action.payload;
                    }
                } else {
                    state.currentProfile = {
                        ...state.currentProfile,
                        bookmarkLists: {
                            [action.payload.id]: action.payload
                        }
                    }
                }
            })
    },
});

export const { updateName, updateEmail, updateProfilePic, updateCurrentProfile,
    addBookmark, removeBookmark, closeWarning } = profileSlice.actions;

export const selectCurrentprofile = (state) => state.profile.currentProfile;
export const selectBookmarks = (state) => state.profile.currentProfile.bookmarks;
export const selectShowDuplicateWarning = (state) => state.profile.showDuplicateWarning;

export default profileSlice.reducer;


