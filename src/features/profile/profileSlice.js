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
};

export const fetchProfileByIdAsync = createAsyncThunk(
    'profile/fetchProfileById',
    async (id, thunkAPI) => {
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
        SoulSourceService.createBookmarkList(bkList, profile);
        thunkAPI.dispatch(closeLoader());

        return bkList;
    }
);

export const updateBookmarkListAsync = createAsyncThunk(
    'login/updateBookmarkList',
    async (bkList, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Updating List...'));
        const profile = thunkAPI.getState().profile.currentProfile;
        SoulSourceService.updateBookmarkList(bkList, profile);
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
        updateProfilePic: (state, action) => {
            state.profilePicPath = action.payload;
        },
        updateBookmarkList: (state, action) => {
            state.currentProfile.bookmarkLists[action.payload.id] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileByIdAsync.pending, (state) => {
            })
            .addCase(fetchProfileByIdAsync.rejected, (state) => {
            })
            .addCase(fetchProfileByIdAsync.fulfilled, (state, action) => {
                state.currentProfile = action.payload;
            })
            // Add bookmark
            .addCase(addBookmarkAsync.pending, (state) => {
            })
            .addCase(addBookmarkAsync.rejected, (state) => {
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
            })
            .addCase(removeBookmarkAsync.rejected, (state) => {
            })
            .addCase(removeBookmarkAsync.fulfilled, (state, action) => {
                //delete bookmark obj
                delete state.currentProfile.bookmarks[action.payload];
            })
            .addCase(createBookmarkListAsync.pending, (state) => {
            })
            .addCase(createBookmarkListAsync.rejected, (state) => {
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
            .addCase(updateBookmarkListAsync.pending, (state) => {
            })
            .addCase(updateBookmarkListAsync.rejected, (state) => {
            })
            .addCase(updateBookmarkListAsync.fulfilled, (state, action) => {
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

export const { updateCurrentProfile, updateBookmarkList, updateProfilePic} = profileSlice.actions;

export const selectCurrentprofile = (state) => state.profile.currentProfile;
export const selectBookmarks = (state) => state.profile.currentProfile.bookmarks;
export const selectBookmarkLists = (state) => state.profile.currentProfile.bookmarkLists;
export const selectShowDuplicateWarning = (state) => state.profile.showDuplicateWarning;

export default profileSlice.reducer;