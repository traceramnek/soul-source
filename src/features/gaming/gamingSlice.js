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
                state.gamingList.forEach((gameItem, index) =>{
                    gameItem['id'] = `${gameItem.title}_uuid${index}`;
                });
                state.loading = false;
                state.hasError = false;
            })
    },
});

export const { } = gamingSlice.actions;

export const selectGamingList = (state) => state.gaming.gamingList;

export default gamingSlice.reducer;


