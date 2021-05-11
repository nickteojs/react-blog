import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import FlashMessage from './FlashMessage'

const Login = () => {

    const history = useHistory()
    const emailRef= useRef()
    const passwordRef= useRef()
    const { loginHandler, error, loading } = useAuth()

    const submitHandler = (e) => {
        e.preventDefault()
        loginHandler(emailRef.current.value, passwordRef.current.value, history);
    }

    return (
        <div>
            <h1>Login</h1>
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
            {error ? <FlashMessage message={error} error={error}/> : null}
        </div>
    )
}

export default Login
