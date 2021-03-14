import React from 'react'

const Login = () => {
    return (
        <div>
            <form action="">
                <div className="form-control">
                    <label>Username</label>
                    <input type="text"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="text"/>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
