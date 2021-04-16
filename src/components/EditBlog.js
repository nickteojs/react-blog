import React, {useState} from 'react'

const EditBlog = ({blog, editBlog}) => {
    const [name, setName] = useState(blog.name);
    const [desc, setDesc] = useState(blog.desc)
    const [content, setContent] = useState(blog.content)

    const onSubmit = (e) => {
        e.preventDefault();
        const editedBlog = {...blog, name,desc, content}
        editBlog(editedBlog);
    }

    return (
        <div>
            <form>
                <label>Name</label>
                <input 
                    className="form-control"
                    type="text"
                    defaultValue={blog.name}
                    onChange={e => setName(e.target.value)}
                />
                <label>Description</label>
                <input 
                    className="form-control"
                    type="text"
                    defaultValue={blog.desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <label>What do you want to post?</label>
                <input 
                    className="form-control form-control-textarea"
                    type="text"
                    defaultValue={blog.content}
                    onChange={e => setContent(e.target.value)}
                />
                <button className="btn" onClick={onSubmit}>Save Changes!</button>
            </form>
        </div>
    )
}

export default EditBlog;
