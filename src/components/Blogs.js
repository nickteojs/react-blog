import React, { useContext } from 'react'
import Blog from './Blog'
import { BlogContext } from '../context/BlogContext'

const Blogs = ({removeBlog}) => {
    const [blogs] = useContext(BlogContext);
    
    return (
        <div>
            {blogs.map(blog => (
                <Blog name={blog.name} content={blog.content} desc={blog.desc} removeBlog={removeBlog} blog={blog} key={blog.id}/>
            ))}
        </div>
    )
}

export default Blogs
