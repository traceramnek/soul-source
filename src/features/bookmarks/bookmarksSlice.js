import { AcUnitOutlined } from '@material-ui/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bookmarks: [],
    loading: false,
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
        addBookmark: (state, action) => {
            if(state.bookmarks) {
                state.bookmarks.push(action.payload);
            }
        },
        removeBookmark: (state, action) => {
            state.bookmarks.filter(bookmark => bookmark.id !== action.payload)
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

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export const selectBookmarks = (state) => state.bookmarks.bookmarks;

export default bookmarksSlice.reducer;


