import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const PrivateRoute = ({component, render, ...rest}) => {
    const {currentUser} = useAuth();
    return (
        <Route {...rest} render={props => {
        //    return currentUser ? <Component {...props} /> : <Redirect to ="/login" />
           return currentUser ? (component ? React.createElement(component, props) : render (props)) : <Redirect to="/login" />
        }} />
    )
}

export default PrivateRoute
