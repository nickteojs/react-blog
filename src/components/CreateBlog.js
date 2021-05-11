import { useState, useContext } from 'react'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {useHistory} from 'react-router-dom'

const CreateBlog = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const {currentUser} = useAuth()
    const [author, setAuthor] = useState(currentUser.email)
    const {addBlog} = useContext(BlogContext)
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        const id = (Math.floor(Math.random() * 10000) + 1).toString();
        addBlog({name, desc, content, id, author}, history);
        setName('');
        setDesc('');
        setContent('');
    }

    return (
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input 
                    className="form-control"
                    type="text"
                    value={name}
                    required
                    onChange = {(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <input 
                    className="form-control"
                    type="text"
                    required
                    value={desc}
                    onChange = {(e) => setDesc(e.target.value)}
                />
                <label>What do you want to post?</label>
                <input 
                    className="form-control form-control-textarea"
                    type="text"
                    required
                    value={content}
                    onChange = {(e) => setContent(e.target.value)}
                />
                <button className="btn" type="submit">Add Blog!</button>
            </form>
    )
}

export default CreateBlog
