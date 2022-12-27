import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

function Alert (props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FlashMessage = () => {
    const { message, type } = useSelector(state => state.toastSlice);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (message.length > 0 ) {
            setOpen(true);
        }
    }, [message.length]);

    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type === 'success' ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FlashMessage;
