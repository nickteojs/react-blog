import React, {useState, createContext, useEffect, useContext} from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('')

    const registerHandler = (email, password, history) => {
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                setSuccess("Account created!");
                history.push("/")
            })
            .catch((error) => {
                let errorMsg = error.message;
                setError(errorMsg);
                setLoading(false);
                setTimeout(() => {
                    setError('')
                }, 2000);
            })
    }

    const loginHandler = (email, password, history) => {
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            setLoading(false)
            setSuccess("Logged in!");
            history.push("/")
        })
        .catch((error) => {
            let errorMsg = error.message;
            setError(errorMsg);
            setLoading(false);
            setTimeout(() => {
                setError('')
            }, 2000);
        })
    }

    const logoutHandler = (history) => {
        setLoading(true)
        auth.signOut()
        .then(() => {
            setLoading(false)
            setSuccess("Logged out!");
            history.push("/")
        })
        .catch((error) => {
            let errorMsg = error.message;
            setError(errorMsg);
            setLoading(false);
        })
    }

    // Is called whenever we use login/register to set the current user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })
        // Unsubscribes from the auth state listener when component unmounts
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        registerHandler,
        loginHandler,
        logoutHandler,
        error,
        loading,
        success,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

