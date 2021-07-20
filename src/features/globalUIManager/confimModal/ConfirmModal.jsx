import {
    Dialog, DialogTitle,
    DialogActions, Button, DialogContent, DialogContentText
} from '@material-ui/core';
import './ConfirmModal.scss';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    h6: {
        color: 'ghostwhite',
        fontWeight: 600
    },
    paper: {
        backgroundColor: '#424242',
    },
    body1: {
        color: 'ghostwhite',
        fontWeight: 600
    },
    cancelButton: {
        color: 'ghostwhite'
    },
    confirmButton: {
        color: '#c31363'
    }
}));

export default function ConfirmModal(props) {

    const classes = useStyles();


    const handleCloseDialog = () => {
        props.handleClose();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleCloseDialog} classes={classes}>
                {
                    <div>
                        <DialogTitle classes={{ root: classes.h6 }}
                            id="responsive-dialog-title">{props.title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText classes={{ root: classes.body1 }}>
                                {props.text}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions >
                            <Button classes={{ root: classes.cancelButton }}
                                autoFocus onClick={handleCloseDialog}>
                                {props.cancelLabel}
                            </Button>
                            <Button classes={{ root: classes.confirmButton }}
                                onClick={props.handleProceed} autoFocus>
                                {props.proceedLabel}
                            </Button>
                        </DialogActions>
                    </div>
                }
            </Dialog>
        </div>
    )
}