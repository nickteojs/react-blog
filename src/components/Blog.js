import React, {useState, useEffect} from 'react'
import {TiDelete} from 'react-icons/ti'
import {AiFillEdit} from 'react-icons/ai'
import {Link, useLocation, useParams} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import firebase from '../firebase'
import Loader from './Loader'


const Blog = ({removeBlog}) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true)
    const {currentUser} = useAuth();
    const {
        state: {blog}
    } = useLocation();

    let {id} = useParams()
    const ref = firebase.firestore().collection("blogs").doc(id);

    const blogFetcher = () => {
        ref.get().then((doc) => {
            if (doc.exists) {
                setLoading(false)
                const {author, content, desc, name} = doc.data()
                setName(name)
                setDesc(desc)
                setContent(content)
                setAuthor(author)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        blogFetcher();
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="blog">
            <h1>{name}</h1>
            <p>{desc}</p>
            <p>{content}</p>
            <p>Posted by: {author}</p>
            {currentUser.email === blog.author ? <TiDelete style={{cursor: 'pointer'}} onClick={() => removeBlog(blog)}/> : null}
            {currentUser.email === blog.author ? <Link to={{
                pathname:`/blogs/${blog.id}/edit`
            }}>
                <AiFillEdit style={{color: 'black'}}/>
            </Link> : null}
        </div>
    )
}

export default Blog
