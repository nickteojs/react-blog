import React, {useEffect, useRef, useState } from 'react';
import {useHistory, Link} from 'react-router-dom';
import { Button, TextField, Box, Container, Typography, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import { login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const history = useHistory();
    const emailRef= useRef();
    const passwordRef= useRef();
    const { user, loading } = useSelector(state => state.authSlice);

    const dispatch = useDispatch();
    
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    
    const useStyles = makeStyles((theme) => ({
        root: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(loginInfo));
    }

    const inputHandler = (event, type) => {
        setLoginInfo({
            ...loginInfo,
            [type]: event.target.value
        });
    }

    // Redirect if logged in
    useEffect(() => {
        if (user) {
            history.replace("/");
        }
    }, [user]);

    return (
        <Container maxWidth="xs">
            <Grid container justifyContent="center">
                <Grid item xs={11} sm={12}>
                    <div className={classes.root}>
                        <Typography gutterBottom variant="h3">Sign in!</Typography>            
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
                                {loading ? <CircularProgress size={20}/> : 'Login'}
                            </Button>
                            <Typography align="center">
                                <Link to="/register">
                                    Don't have an account? Sign up!
                                </Link>
                            </Typography>
                            <Box mt={6}>
                                <Footer/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
