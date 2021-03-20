import { useState, useContext } from 'react'

const CreateBlog = ({ addBlog }) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        const id = (Math.floor(Math.random() * 10000) + 1).toString();
        addBlog({name, desc, content, id});
        setName('');
        setDesc('');
        setContent('');
    }

    return (
            <form>
                <label>Name</label>
                <input 
                    className="form-control"
                    type="text"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <input 
                    className="form-control"
                    type="text"
                    value={desc}
                    onChange = {(e) => setDesc(e.target.value)}
                />
                <label>What do you want to post?</label>
                <input 
                    className="form-control form-control-textarea"
                    type="text"
                    value={content}
                    onChange = {(e) => setContent(e.target.value)}
                />
                <button className="btn" onClick={onSubmit}>Add Blog!</button>
            </form>
    )
}

export default CreateBlog
