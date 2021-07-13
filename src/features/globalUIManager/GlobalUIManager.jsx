
import { useDispatch, useSelector } from 'react-redux';
import {
    closeSnackbar,
    selectSnackbarDuration,
    selectSnackbarMessage,
    selectSnackbarOpen, selectSnackbarType, selectLoaderOpen, selectLoaderMessage
} from './globalUIManagerSlice';
import { Snackbar, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import './GlobalUIManager.scss';

export default function GlobalUIManager() {
    const dispatch = useDispatch();
    const snackbarOpen = useSelector(selectSnackbarOpen);
    const message = useSelector(selectSnackbarMessage);
    const type = useSelector(selectSnackbarType);
    const duration = useSelector(selectSnackbarDuration);
    const loaderOpen = useSelector(selectLoaderOpen);
    const loaderMessage = useSelector(selectLoaderMessage);

    const wrapper = React.createRef();

    function handleClose() {
        dispatch(closeSnackbar());
    }

    return (
        <div>
            {/* Snackbar */}
            <div >
                <Snackbar ref={wrapper}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={snackbarOpen} autoHideDuration={duration} onClose={handleClose}
                    aria-describedby="client-snackbar" >
                    <Alert onClose={handleClose} severity={type}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>


            {/* Loader */}
            {loaderOpen &&
                <div>
                    <div className="loader-overlay">
                        <CircularProgress color="secondary" />
                        <h3>{loaderMessage}</h3>
                    </div>
                </div>
            }
        </div>
    );
}