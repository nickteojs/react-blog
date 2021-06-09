import React, { createContext, useState, useEffect } from 'react'
import firebase from '../firebase'

export const BlogContext = createContext();

export const BlogProvider = ({children}) => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [status, setStatus] = useState("all")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const ref = firebase.firestore().collection("blogs");

    const filterHandler = () => {
        switch(status){
            case "Travel":
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Travel"))
                break;
            case 'Health':
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Health"))
                break;
            case 'Lifestyle':
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Lifestyle"))
                break;
            case 'Food':
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Food"))
                break;
            case 'Sports':
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Sports"))
                break;
            case 'Self-Improvement':
                setFilteredBlogs(blogs.filter(blog => blog.topic === "Self-Improvement"))
                break;
            default:
                setFilteredBlogs(blogs);
                break;
        }
    }

    const statusHandler = (topic) => {
        setStatus(topic)
    }

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
        setLoading(true);
        ref.doc(newBlog.id).set(newBlog)
            .then(() => {
                setLoading(false)
                setSuccess('Blog created!')
                history.push("/blogs")
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch((error) => {
                setLoading(false)
                let errorMsg = error.message;
                setError(errorMsg);
                setTimeout(() => {
                    setError('')
                }, 3000);
            });
    }
    
      const removeBlog = (blog, history) => {
          setLoading(true)
            ref.doc(blog.id).delete()
            .then(() => {
                setLoading(false)
                setSuccess("Blog deleted!")
                history.push("/blogs")
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch(error => {
                setLoading(false)
                let errorMsg = error.message;
                setError(errorMsg);
                setTimeout(() => {
                    setError('')
                }, 3000);
            });
      }
    
      const editBlog = (editedBlog, history) => {
        setLoading(true)
        ref.doc(editedBlog.id).update(editedBlog)
            .then(() => {
                setLoading(false)
                setSuccess('Saved changes!')
                history.push(`/blogs/${editedBlog.id}`)
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
            })
            .catch(error => {
                setLoading(false)
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

    useEffect(() => {
        filterHandler()
    }, [blogs, status])

    const value = {
        blogs,
        loading,
        addBlog,
        removeBlog,
        editBlog,
        success,
        error,
        filteredBlogs,
        statusHandler,
        status
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}

