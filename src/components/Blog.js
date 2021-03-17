import React from 'react'

const Blog = ({name, author, desc}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{author}</p>
            <p>{desc}</p>
        </div>
    )
}

export default Blog
