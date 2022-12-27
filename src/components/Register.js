import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Box, Container, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';

const Register = () => {
    const history = useHistory();
    const emailRef= useRef();
    const passwordRef= useRef();
    const displayRef = useRef();
    const bioRef = useRef();
    const dispatch = useDispatch();
    const { user:currentUser, loading } = useSelector(state => state.authSlice);

    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        displayName: '',
        description: '',
        password: ''
    })

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        }
    }));

    const classes = useStyles();

    const inputHandler = (event, type) => {
        setRegisterInfo({
            ...registerInfo,
            [type]: event.target.value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(registerInfo));
    }

    if (currentUser) {
        history.replace("/");
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            <Typography component="h1" variant="h4">Make an account!</Typography>            
                <form className={classes.form} onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        type="email"
                        inputRef={emailRef}
                        autoFocus
                        onChange={e => inputHandler(e, 'email')}
                        >
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Display Name"
                        type="text"
                        inputRef={displayRef}
                        onChange={e => inputHandler(e, 'displayName')}
                        >
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Short description about yourself"
                        type="text"
                        inputRef={bioRef}
                        onChange={e => inputHandler(e, 'description')}
                        >
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        color="neutral.main"
                        fullWidth
                        label="Password"
                        type="password"
                        inputRef={passwordRef}
                        onChange={e => inputHandler(e, 'password')}
                        >
                    </TextField>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        className={classes.submit} 
                        disabled={loading} 
                        type="submit">
                        {loading ? <CircularProgress size={20} /> : "Register"}
                    </Button>
                    <Box mt={6}>
                        <Footer />
                    </Box>
                </form>
            </div>
        </Container>
    )
}

export default Register;
