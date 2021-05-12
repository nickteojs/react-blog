import React, {useState, useEffect, useContext} from 'react'
import firebase from '../firebase'
import { useParams, Redirect, useHistory } from 'react-router-dom';
import Loader from '../components/Loader'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {Button, TextField, Link, Box, Container, Typography, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlashMessage from './FlashMessage'

const EditBlog = ({blog}) => {
    const history = useHistory()
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(true)
    const {currentUser} = useAuth()
    const [open, setOpen] = useState(false)
    const {editBlog, error, success} = useContext(BlogContext)
    let {id} = useParams();
    const ref = firebase.firestore().collection("blogs").doc(id);

    const onSubmit = (e) => {
        e.preventDefault();
        const editedBlog = {...blog, name, desc, content}
        editBlog(editedBlog);
        setOpen(false)
        console.log("Triggered")
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
        paper2: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
      }));

    const classes = useStyles();

    const authChecker = () => {
        console.log("2. Auth Checker", author)
        if (author) {
            if (currentUser.email !== author) {
                history.push("/")
            }
        }
    }

    const inputFiller = (name, desc, content, author) => {
        setName(name)
        setDesc(desc)
        setContent(content)
        setAuthor(author)
    }

    const blogFetcher = async () => {
        try {
            const doc = await ref.get()
            if(doc.exists) {
                setLoading(false)
                const {content, desc, name, author} = doc.data()
                inputFiller(name, desc, content, author)
                authChecker()
            }
        }
        catch (error) {
            console.log("Error getting document:", error);
        }
    }

    useEffect(() => {
        blogFetcher();
    }, [author])

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
            <h2 id="simple-modal-title">Confirm changes?</h2>
            </Typography>
            <Button variant="contained" color="primary" onClick={onSubmit}>Yes</Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>No</Button>
        </div>
    )

    return (
        <Container>
            <form>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Post Name"
                        type="text"
                        value={name}
                        autoFocus
                        disabled={currentUser.email !== author}
                        onChange = {(e) => setName(e.target.value)}
                        >
                    </TextField>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Post Description"
                        type="text"
                        value={desc}
                        autoFocus
                        disabled={currentUser.email !== author}
                        onChange = {(e) => setDesc(e.target.value)}
                        >
                    </TextField>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Post Content"
                        type="text"
                        value={content}
                        autoFocus
                        multiline
                        disabled={currentUser.email !== author}
                        onChange = {(e) => setContent(e.target.value)}
                        >
                    </TextField>
                    <Button
                        alignItems="center" 
                        variant="contained" 
                        color="primary" 
                        disabled={loading}
                        className={classes.submit} 
                        onClick={handleOpen}>
                        Save changes!
                    </Button>            
                    </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            {modalBody}
            </Modal>
            {success ? <FlashMessage message={success} success={success} /> : null}
            {error ? <FlashMessage message={error} error={error}/> : null}
        </Container>
    )
}

export default EditBlog;
