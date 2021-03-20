import axios from '../axios-blogs';
import React, { createContext, useState, useEffect } from 'react'
import firebase from '../firebase'

export const BlogContext = createContext();
 
export const BlogProvider = props => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = firebase.firestore().collection("blogs");

    const fetchBlogs = () => {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((document) => {
                items.push(document.data());
            })
            setBlogs(items);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <BlogContext.Provider value={[blogs, loading]}>
            {props.children}
        </BlogContext.Provider>
    )
}

