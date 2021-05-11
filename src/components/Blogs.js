import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import FlashMessage from './FlashMessage'

const Blogs = () => {
    const {blogs, loading, success} = useContext(BlogContext);
    if (loading) {
        return <Loader />
    }
    return (
        <div className="blog-invidivual">
            {blogs.map(blog => (
                <Link to={{
                    pathname:`/blogs/${blog.id}`,
                    state: {
                        blog,
                    }
                }} key={blog.id}>      
                    <h1>{blog.name}</h1>
                    <p>{blog.author}</p>
                </Link>
            ))}
            {success ? <FlashMessage message={success} success={success}/> : null}
        </div>
    )
}

export default Blogs
