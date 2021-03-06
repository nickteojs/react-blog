import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {useHistory, Redirect} from 'react-router-dom'
import FlashMessage from './FlashMessage'
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer'

const Register = () => {
    const history = useHistory()
    const emailRef= useRef()
    const passwordRef= useRef()
    const displayRef = useRef()
    const bioRef = useRef()
    const { registerHandler, error, loading, currentUser } = useAuth()

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

    const submitHandler = (e) => {
        e.preventDefault()
        registerHandler(emailRef.current.value, passwordRef.current.value, displayRef.current.value, bioRef.current.value, history);
    }

    if (currentUser) {
        return <Redirect to="/"/>
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
                        >
                    </TextField>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        className={classes.submit} 
                        disabled={loading} 
                        type="submit">
                        Register
                    </Button>
                    <Box mt={6}>
                        <Footer />
                    </Box>
                </form>
            </div>
            {error ? <FlashMessage message={error} error={error}/> : null}
        </Container>
    )
}

export default Register
