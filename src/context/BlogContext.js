import React, { createContext, useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebase'

export const BlogContext = createContext();
 
export const BlogProvider = ({children}) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
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

    const addBlog = (newBlog, history) => {
        ref
            .doc(newBlog.id)
            .set(newBlog)
            .then(() => {
                setSuccess('Blog created!')
                history.push("/blogs")
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch((error) => {
                let errorMsg = error.message;
                setError(errorMsg);
                setTimeout(() => {
                    setError('')
                }, 3000);
            });
    }
    
      const removeBlog = (blog, history) => {
        ref
            .doc(blog.id)
            .delete()
            .then(() => {
                setSuccess("Blog deleted!")
                history.push("/blogs")
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch(error => {
                let errorMsg = error.message;
                setError(errorMsg);
                setTimeout(() => {
                    setError('')
                }, 3000);
            });
      }
    
      const editBlog = (editedBlog) => {
        ref
            .doc(editedBlog.id)
            .update(editedBlog)
            .then(() => {
                setSuccess('Saved changes!')
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch(error => {
                    let errorMsg = error.message;
                    setError(errorMsg);
                    setTimeout(() => {
                        setError('')
                    }, 2000);
            });
      }

    useEffect(() => {
        fetchBlogs();
    }, [])

    const value = {
        blogs,
        loading,
        addBlog,
        removeBlog,
        editBlog,
        success,
        error
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}

