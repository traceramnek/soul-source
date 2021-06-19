import { AcUnitOutlined } from '@material-ui/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bookmarks: [],
    loading: false,
    showDuplicateWarning: false,
    hasError: false,
};

export const fetchBookmarksAsync = createAsyncThunk(
    'bookmarks/fetchBookmarks',
    async (pathToResource) => {
        const data = await axios.get(pathToResource);
        return data.data;
    }
);

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmark: (state, action) => { // payload should be a new bookmark object
            if (state.bookmarks) {
                let index = state.bookmarks.findIndex(elm => elm.id === action.payload.id);
                if (index === -1) {
                    state.bookmarks.push(action.payload);
                } else {
                    state.showDuplicateWarning = true;
                }
            }
        },
        removeBookmark: (state, action) => { // payload should be the id
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload);
        },
        closeWarning: (state) => { 
            state.showDuplicateWarning = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarksAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(fetchBookmarksAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(fetchBookmarksAsync.fulfilled, (state, action) => {
                state.bookmarks = action.payload;
                state.loading = false;
                state.hasError = false;
            })
    },
});

export const { addBookmark, removeBookmark, closeWarning } = bookmarksSlice.actions;

export const selectBookmarks = (state) => state.bookmarks.bookmarks;
export const selectShowDuplicateWarning = (state) => state.bookmarks.showDuplicateWarning;

export default bookmarksSlice.reducer;


