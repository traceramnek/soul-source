
import { useDispatch, useSelector } from 'react-redux';
import {
    closeSnackbar,
    selectSnackbarDuration,
    selectSnackbarMessage,
    selectSnackbarOpen, selectSnackbarType, selectLoaderOpen, selectLoaderMessage
} from './globalUIManagerSlice';
import { Snackbar, Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import './GlobalUIManager.scss';
import { makeStyles } from '@material-ui/core/styles';
import { classes } from 'istanbul-lib-coverage';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column'
    },
}));

export default function GlobalUIManager() {
    const dispatch = useDispatch();
    const snackbarOpen = useSelector(selectSnackbarOpen);
    const message = useSelector(selectSnackbarMessage);
    const type = useSelector(selectSnackbarType);
    const duration = useSelector(selectSnackbarDuration);
    const loaderOpen = useSelector(selectLoaderOpen);
    const loaderMessage = useSelector(selectLoaderMessage);

    const wrapper = React.createRef();
    const classes = useStyles();

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