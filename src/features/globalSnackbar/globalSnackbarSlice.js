import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    message: 'Default Global Snackbar Message',
    type: 'success',
    duration: 5000
};


export const globalSnackbarSlice = createSlice({
    name: 'globalSnackbar',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.duration = (action.payload.duration !== null) ? action.payload.duration: initialState.duration;
        },
        closeSnackbar: (state) => {
            state.open = false;
            state.message = '';
        }
    },
});

export const { openSnackbar, closeSnackbar} = globalSnackbarSlice.actions;

export const selectSnackbarOpen = (state) => state.ui.open;
export const selectSnackbarMessage = (state) => state.ui.message;
export const selectSnackbarType = (state) => state.ui.type;
export const selectSnackbarDuration = (state) => state.ui.duration;

export default globalSnackbarSlice.reducer;


