import React from 'react'
import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component, render, ...rest}) => {
    const { user:currentUser } = useSelector(state => state.authSlice);
    return (
        <Route {...rest} render={props => {
           return currentUser ? (component ? React.createElement(component, props) : render (props)) : <Redirect to="/login" />
        }} />
    )
}

export default PrivateRoute;
