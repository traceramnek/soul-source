import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isNullOrUndefined } from '../../util/utils';

const initialState = {
    currentProfile: {
        name: '',
        email: '',
        profilePicPath: '',
        bookmarks: [],
        bookmarkLists: [],
    },
    showDuplicateWarning: false,
    loading: false,
    hasError: false,
};

export const fetchProfileByIdAsync = createAsyncThunk(
    'profile/fetchProfileById',
    async (id) => {
        const data = await axios.get(`firebase/api/${id}`);
        return data.data;
        // const response = await fetch(pathToFetchFrom);
        // const json = await response.json();

        // return json;
    }
);

export const validateEmailAsync = createAsyncThunk(
    'profile/fvalidateEmail',
    async (email) => {
        return true;
        // const data = await axios.post();
        // return data.data;
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
            if (state.currentProfile.bookmarks) {
                let index = state.currentProfile.bookmarks.findIndex(elm => elm.id === action.payload.id);
                if (index === -1) {
                    state.currentProfile.bookmarks.push(action.payload);
                } else {
                    state.showDuplicateWarning = true;
                }
            }
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
            // Validate email starts here
            .addCase(validateEmailAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(validateEmailAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
                // TODO: Write code to show materlial UI alert saying the email is already used by another account
            })
            .addCase(validateEmailAsync.fulfilled, (state, action) => {
                // call updte email or update email here
            })
    },
});

export const { updateName, updateEmail, updateProfilePic, updateCurrentProfile,
    addBookmark, removeBookmark, closeWarning } = profileSlice.actions;

export const selectCurrentprofile = (state) => state.profile.currentProfile;
export const selectBookmarks = (state) => state.profile.currentProfile.bookmarks;
export const selectShowDuplicateWarning = (state) => state.profile.showDuplicateWarning;

export default profileSlice.reducer;


