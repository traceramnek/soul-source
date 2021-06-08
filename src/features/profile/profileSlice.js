import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    profiles: [],
    currentprofile: {
        name: '',
        email: '',
        profilePicPath: '',
        bookmarks: [],
        bookmarkLists: []
    },
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

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addCard: (state, action) => {

        },
        updateName: (state, action) => {
            if (action.payload > -1 && action.payload < state.profiles.length) {
                state.currentprofile = state.profiles[action.payload];
            } else {
                state.currentprofile = state.profiles[0];
            }
        },
        updateEmail: (state, action) => {
            if (action.payload !== null && action.payload !== '') {
                state.email = action.payload;
            }

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
                state.currentprofile = action.payload;
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

export const { changeCard } = profileSlice.actions;

export const selectprofiles = (state) => state.profiles.profiles;
export const selectCurrentprofile = (state) => state.profiles.currentprofile;

export default profileSlice.reducer;


