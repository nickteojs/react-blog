import React from 'react'
import {TiDelete} from 'react-icons/ti'
import {AiFillEdit} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const Blog = ({name, desc, content, removeBlog, blog}) => {
    return (
        <div className="blog">
            <h1>{name}</h1>
            <p>{desc}</p>
            <p>{content}</p>
            <TiDelete style={{cursor: 'pointer'}} onClick={() => removeBlog(blog)}/>
            <Link to={{
                pathname:`/blogs/${blog.id}/edit`,
            }}>
                <AiFillEdit style={{color: 'black'}}/>
            </Link>
        </div>
    )
}

export default Blog
