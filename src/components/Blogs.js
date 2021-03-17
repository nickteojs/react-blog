import React, { useContext } from 'react'
import Blog from './Blog'
import { BlogContext } from '../context/BlogContext'

const Blogs = () => {
    const [blogs] = useContext(BlogContext);
    
    return (
        <div>
            {blogs.map(blog => (
                <Blog name={blog.name} author={blog.author} desc={blog.desc}/>
            ))}
        </div>
    )
}

export default Blogs
