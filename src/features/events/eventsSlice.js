import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseDB } from '../../services/firebase';
import { closeLoader, openLoader } from '../globalUIManager/globalUIManagerSlice';

const initialState = {
    eventsList: [],
    loading: false,
    hasError: false,
};

export const fetchEventsListAsync = createAsyncThunk(
    'events/fetchEventsList',
    async (event, thunkAPI) => {
        // const response = await axios.get(pathToResource);
        // return response.data;

        thunkAPI.dispatch(openLoader('Loading latest event sources...'));
        const eventsResp = firebaseDB.ref('events');
        const snapshot = await eventsResp.once('value');

        thunkAPI.dispatch(closeLoader());


        return snapshot.val();
    }
);

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        toggleShowFullSummary: (state, action) => {
            state.eventsList[action.payload]['showFullSummary'] = !state.eventsList[action.payload]['showFullSummary'];
        }
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
                state.eventsList.forEach((event, index) => {
                    event['id'] = `${event.title.split(' ').join('').toLowerCase()}_uuid${index}`;
                    event['showFullSummary'] = false;
                });
                state.loading = false;
                state.hasError = false;
            })
    },
});

export const { toggleShowFullSummary} = eventsSlice.actions;

export const selectEventsList = (state) => state.events.eventsList;
export const selectEventsLoading = (state) => state.events.loading;

export default eventsSlice.reducer;


