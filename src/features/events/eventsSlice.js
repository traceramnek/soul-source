import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { firebaseDB } from '../../services/firebase';



const initialState = {
    eventsList: [],
    loading: false,
    hasError: false,
};

export const fetchEventsListAsync = createAsyncThunk(
    'events/fetchEventsList',
    async (pathToResource) => {
        // const response = await axios.get(pathToResource);
        // return response.data;

        const eventsResp = firebaseDB.ref('gaming');
        const snapshot = await eventsResp.once('value');

        return snapshot.val();
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


