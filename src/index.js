import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BlogProvider} from './context/BlogContext'
import {AuthProvider} from './context/AuthContext'
import {ThemeProvider, useTheme} from '@material-ui/core'
import Theme from './context/Theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
    <AuthProvider>
    <BlogProvider>
    <App />
    </BlogProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
