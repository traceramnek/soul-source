import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";


const initialState = {
    eventsList: [],
    loading: false,
    hasError: false,
};

export const fetchEventsListAsync = createAsyncThunk(
    'events/fetchEventsList',
    async (pathToResource) => {
        const response = await axios.get(pathToResource);
        return response.data;
    }
);

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsListAsync.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(fetchEventsListAsync.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            })
            .addCase(fetchEventsListAsync.fulfilled, (state, action) => {
                state.eventsList = action.payload;
                //set ids on load
                state.eventsList.forEach((event, index) =>{
                    event['id'] = `${event.title}_uuid${index}`;
                });
                state.loading = false;
                state.hasError = false;
            })
    },
});

export const { } = eventsSlice.actions;

export const selectEventsList = (state) => state.events.eventsList;

export default eventsSlice.reducer;


