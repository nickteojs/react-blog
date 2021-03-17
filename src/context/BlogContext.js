import axios from '../axios-blogs';
import React, { createContext, useState, useEffect } from 'react'
import firebase from '../firebase'

export const BlogContext = createContext();
 
export const BlogProvider = props => {
    const [blogs, setBlogs] = useState([]);

    const ref = firebase.firestore().collection("blogs");

    const fetchBlogs = () => {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((document) => {
                items.push(document.data());
            })
            setBlogs(items);
        })
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    

    // Submit Blog Handler 
    // axios.post('/blogs.json');

    return (
        <BlogContext.Provider value={[blogs]}>
            {props.children}
        </BlogContext.Provider>
    )
}

