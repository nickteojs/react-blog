import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const Login = () => {

    const history = useHistory()
    const emailRef= useRef()
    const passwordRef= useRef()
    const { loginHandler, error, loading, success } = useAuth()

    const submitHandler = (e) => {
        e.preventDefault()
        loginHandler(emailRef.current.value, passwordRef.current.value, history);
    }

    return (
        <div>
            <Snackbar autoHideDuration={6000}>
                <Alert severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
            <h1>Login</h1>
            {error && <div className="alert-error"><p>{error}</p></div>}
            {success && <div className="alert-success"><p>{success}</p></div>}
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label>E-mail</label>
                    <input type="email" required ref={emailRef}/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" minlength="6" required ref={passwordRef}/>
                </div>
                <button disabled={loading} type="submit">Login</button>
                <button><Link to ="/register">Register</Link></button>
            </form>
        </div>
    )
}

export default Login
