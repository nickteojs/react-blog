import React, {useState, useEffect, useContext} from 'react'
import {TiDelete} from 'react-icons/ti'
import {AiFillEdit} from 'react-icons/ai'
import {Link, useLocation, useParams, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import firebase from '../firebase'
import Loader from './Loader'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import {Typography} from '@material-ui/core'
import FlashMessage from './FlashMessage'


const Blog = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true)
    const {currentUser} = useAuth();
    const [open, setOpen] = useState(false)
    const {removeBlog, error} = useContext(BlogContext)
    const history = useHistory()
    const {
        state: {blog}
    } = useLocation();
    let {id} = useParams()
    const ref = firebase.firestore().collection("blogs").doc(id);

    const onSubmit = () => {
        removeBlog(blog, history);
        setOpen(false)
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          left: '50%',
          marginLeft: -200,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(3, 4, 3),
        },
      }));

    const classes = useStyles();

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

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const modalBody = (
        <div className={classes.paper}>
            <Typography align="center">
            <h2 id="simple-modal-title">Delete blog?</h2>
            </Typography>
            <Button variant="contained" color="primary" onClick={onSubmit}>Yes</Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>No</Button>
        </div>
    )

    return (
        <div className="blog">
            <h1>{name}</h1>
            <p>{desc}</p>
            <p>{content}</p>
            <p>Posted by: {author}</p>
            {currentUser.email === blog.author ? <TiDelete style={{cursor: 'pointer'}} onClick={handleOpen}/> : null}
            {currentUser.email === blog.author ? <Link to={{
                pathname:`/blogs/${blog.id}/edit`
            }}>
                <AiFillEdit style={{color: 'black'}}/>
            </Link> : null}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            {modalBody}
            </Modal>
            {error ? <FlashMessage message={error} error={error}/> : null}
        </div>
    )
}

export default Blog
