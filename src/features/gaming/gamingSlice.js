import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseDB } from '../../services/firebase';
import { isNullOrUndefined } from '../../util/utils';
import { openLoader, closeLoader } from '../../features/globalUIManager/globalUIManagerSlice';


const initialState = {
    gamingList: [],
    loading: false,
    hasError: false,
};

export const fetchGamingListAsync = createAsyncThunk(
    'gaming/fetchGamingList',
    async (event, thunkAPI) => {
        // const response = await axios.get(pathToResource);
        // return response.data;
        thunkAPI.dispatch(openLoader('Loading latest gaming sources...'));
        const gamingResp = firebaseDB.ref('gaming');
        const snapshot = await gamingResp.once('value');

        thunkAPI.dispatch(closeLoader());

        return snapshot.val();

    }
);

export const gamingSlice = createSlice({
    name: 'gaming',
    initialState,
    reducers: {
        toggleShowFullSummary: (state, action) => {
            state.gamingList[action.payload]['showFullSummary'] = !state.gamingList[action.payload]['showFullSummary'];
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
                if (!isNullOrUndefined(action.payload)) {
                    state.gamingList = action.payload;
                    state.gamingList.forEach((gameItem, index) => {
                        // TODO: change id so it's shorter but still unique
                        gameItem['id'] = `${gameItem.title.split(' ').join('').toLowerCase()}_uuid${index}`;
                        gameItem['showFullSummary'] = false;
                    });
                    state.loading = false;
                    state.hasError = false;
                }

            })
    },
});

export const { toggleShowFullSummary} = gamingSlice.actions;

export const selectGamingList = (state) => state.gaming.gamingList;
export const selectGamingLoading = (state) => state.gaming.loading;

export default gamingSlice.reducer;


