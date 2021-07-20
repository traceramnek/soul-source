import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbarOpen: false,
    message: 'Default Global Snackbar Message',
    type: 'success',
    duration: 5000,
    loaderOpen: false,
    loaderMessage: 'Loading latest Soul Sources...',
    dialogOpen: false,
    componentToLoadInDialog: null,
    dialogProps: null
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
        },
        openDialog: (state, action) => {
            state.componentToLoadInDialog = action.payload.componentToLoad;
            state.dialogProps = action.payload.dialogProps;
            state.dialogOpen = true;
        },
        closeDialog: (state) => {
            state.dialogOpen = false;
            state.componentToLoadInDialog = null
            state.dialogProps = null;
        }
    },
});

export const { openSnackbar, closeSnackbar, openLoader,
    closeLoader, openDialog, closeDialog} = globalUIManagerSlice.actions;

export const selectSnackbarOpen = (state) => state.ui.snackbarOpen;
export const selectSnackbarMessage = (state) => state.ui.message;
export const selectSnackbarType = (state) => state.ui.type;
export const selectSnackbarDuration = (state) => state.ui.duration;
export const selectLoaderOpen = (state) => state.ui.loaderOpen;
export const selectLoaderMessage = (state) => state.ui.loaderMessage;
export const selectDialogOpen = (state) => state.ui.dialogOpen;
export const selectComponentForDialog = (state) => state.ui.componentToLoadInDialog;
export const selectDialogProps = (state) => state.ui.dialogProps;
export const selectConfirmDialogOpen = (state) => state.ui.confirmDialogOpen;
export const selectConfirmDialog = (state) => state.ui.confirmDialog;


export default globalUIManagerSlice.reducer;


