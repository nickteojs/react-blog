import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {useHistory, Redirect} from 'react-router-dom'
import FlashMessage from './FlashMessage'
import {Button, TextField, Link, Box, Container, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer'

const Login = () => {
    const history = useHistory()
    const emailRef= useRef()
    const passwordRef= useRef()
    const { loginHandler, error, loading, currentUser } = useAuth()
    
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
        loginHandler(emailRef.current.value, passwordRef.current.value, history);
    }

    if (currentUser) {
        return <Redirect to="/"/>
    }

    return (
        <Container maxWidth="xs">
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
                        >
                    </TextField>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        className={classes.submit} 
                        disabled={loading} 
                        type="submit">
                        Login
                    </Button>
                    <Typography align="center">
                        <Link href="/register" variant="body2">
                            Don't have an account? Sign up!
                        </Link>
                    </Typography>
                    <Box mt={6}>
                        <Footer/>
                    </Box>
                </form>
            </div>
            {error ? <FlashMessage message={error} error={error}/> : null}
        </Container>
    )
}

export default Login
