import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import FlashMessage from './FlashMessage'


const Register = () => {
    const history = useHistory()
    const emailRef= useRef()
    const passwordRef= useRef()
    const { registerHandler, error, loading, success } = useAuth()

    const submitHandler = (e) => {
        e.preventDefault()
        registerHandler(emailRef.current.value, passwordRef.current.value, history);
    }

    return (
        <div>
            <h1>Register an account</h1>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label>E-mail</label>
                    <input type="email" required ref={emailRef}/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" minlength="6" required ref={passwordRef}/>
                </div>
                <button disabled={loading} type="submit">Register</button>
            </form>
            {error ? <FlashMessage message={error} error={error}/> : null}
        </div>
    )
}

export default Register
