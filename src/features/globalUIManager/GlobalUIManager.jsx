
import { useDispatch, useSelector } from 'react-redux';
import {
    closeSnackbar,
    selectSnackbarDuration,
    selectSnackbarMessage,
    selectSnackbarOpen, selectSnackbarType, selectLoaderOpen,
    selectLoaderMessage, selectComponentForDialog,
    closeDialog, selectDialogOpen, selectDialogProps
} from './globalUIManagerSlice';
import {
    Snackbar, CircularProgress, Dialog
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import './GlobalUIManager.scss';
import BookmarkListForm from '../bookmarks/BookmarkListForm';
import Login from '../../components/Login/Login';
import { isNullOrUndefined } from '../../util/utils';

const createCustomComponent = (componentName, componentProps) => {
    let CustomComponent;
    switch (componentName) {
        case 'BookmarkListForm':
            CustomComponent = React.createElement(BookmarkListForm, {
                ...componentProps
            });
            break;
        case 'Login':
            CustomComponent = React.createElement(Login, {
                ...componentProps
            });
            break;
        default:
            break;
    }
    return CustomComponent;
}

export default function GlobalUIManager() {
    const dispatch = useDispatch();
    const snackbarOpen = useSelector(selectSnackbarOpen);
    const message = useSelector(selectSnackbarMessage);
    const type = useSelector(selectSnackbarType);
    const duration = useSelector(selectSnackbarDuration);
    const loaderOpen = useSelector(selectLoaderOpen);
    const loaderMessage = useSelector(selectLoaderMessage);
    const dialogOpen = useSelector(selectDialogOpen);
    const componentName = useSelector(selectComponentForDialog);
    const dialogProps = useSelector(selectDialogProps);
    const DialogComponent = createCustomComponent(componentName, dialogProps);

    const wrapper = React.createRef();

    function handleCloseSnackbar() {
        dispatch(closeSnackbar());
    }

    const handleCloseDialog = () => {
        dispatch(closeDialog());
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
                    open={snackbarOpen} autoHideDuration={duration} onClose={handleCloseSnackbar}
                    aria-describedby="client-snackbar" >
                    <Alert onClose={handleCloseSnackbar} severity={type}>
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

            {/* Dialog Container */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                {!isNullOrUndefined(DialogComponent) && !isNullOrUndefined(dialogProps) &&
                    DialogComponent
                }
            </Dialog>
            
        </div>
    );
}