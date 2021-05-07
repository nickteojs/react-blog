import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import {Link} from 'react-router-dom'
import Loader from './Loader'

const Blogs = () => {
    const [blogs, loading] = useContext(BlogContext);
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
        </div>
    )
}

export default Blogs
