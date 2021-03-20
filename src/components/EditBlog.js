import React from 'react'

const EditBlog = ({blog}) => {

    return (
        <div>
            <h1>{blog.id}</h1>
            <p>{blog.content}</p>
        </div>
    )
}

export default EditBlog
