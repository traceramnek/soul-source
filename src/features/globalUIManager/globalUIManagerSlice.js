import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbarOpen: false,
    message: 'Default Global Snackbar Message',
    type: 'success',
    duration: 5000,
    loaderOpen: false,
    loaderMessage: 'Loading latest Soul Sources...'
};


export const globalUIManagerSlice = createSlice({
    name: 'GlobalUIManager',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            if (state.snackbarOpen) {
                state.message = action.payload.message;
                state.duration = action.payload.duration;
                return;
            } else {
                state.snackbarOpen = action.payload.snackbarOpen;
                state.message = action.payload.message;
                state.type = action.payload.type;
                state.duration = (action.payload.duration !== null) ? action.payload.duration : initialState.duration;
            }
        },
        closeSnackbar: (state) => {
            state.snackbarOpen = false;
            state.message = '';
        },
        openLoader: (state, action) => {
            state.loaderOpen = true;
            state.loaderMessage = action.payload;
        },
        closeLoader: (state) => {
            state.loaderOpen = false;
        }
    },
});

export const { openSnackbar, closeSnackbar, openLoader, closeLoader } = globalUIManagerSlice.actions;

export const selectSnackbarOpen = (state) => state.ui.snackbarOpen;
export const selectSnackbarMessage = (state) => state.ui.message;
export const selectSnackbarType = (state) => state.ui.type;
export const selectSnackbarDuration = (state) => state.ui.duration;
export const selectLoaderOpen = (state) => state.ui.loaderOpen;
export const selectLoaderMessage = (state) => state.ui.loaderMessage;


export default globalUIManagerSlice.reducer;


