import React, {useRef} from 'react'
import {useAuth} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

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
                <button disabled={loading} type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
