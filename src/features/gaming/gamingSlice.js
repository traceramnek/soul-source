import { AcUnitOutlined } from '@material-ui/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    gamingList: [],
    loading: false,
    hasError: false,
};

export const fetchGamingListAsync = createAsyncThunk(
    'gaming/fetchGamingList',
    async (pathToResource) => {
        const response = await axios.get(pathToResource);
        return response.data;
    }
);

export const gamingSlice = createSlice({
    name: 'gaming',
    initialState,
    reducers: {
        addBookmark: (state, action) => {
            if(state.gamingList) {
                state.gamingList.push(action.payload);
            }
        },
        removeBookmark: (state, action) => {
            state.gamingList.filter(bookmark => bookmark.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamingListAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(fetchGamingListAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(fetchGamingListAsync.fulfilled, (state, action) => {
                state.gamingList = action.payload;
                state.loading = false;
                state.hasError = false;
            })
    },
});

export const { addBookmark, removeBookmark } = gamingSlice.actions;

export const selectGamingList = (state) => state.gaming.gamingList;

export default gamingSlice.reducer;


