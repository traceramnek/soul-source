
import { useDispatch, useSelector } from 'react-redux';
import {
    closeSnackbar,
    selectSnackbarDuration,
    selectSnackbarMessage,
    selectSnackbarOpen, selectSnackbarType
} from './globalSnackbarSlice';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



export default function GlobalSnackbar() {
    const dispatch = useDispatch();
    const open = useSelector(selectSnackbarOpen);
    const message = useSelector(selectSnackbarMessage);
    const type = useSelector(selectSnackbarType);
    const duration = useSelector(selectSnackbarDuration);


    function handleClose() {
        dispatch(closeSnackbar());
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={open} autoHideDuration={duration} onClose={handleClose}
            aria-describedby="client-snackbar" >
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}