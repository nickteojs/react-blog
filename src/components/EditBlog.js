import React, {useState, useEffect, useContext} from 'react'
import firebase from '../firebase'
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../components/Loader'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {Button, TextField, Box, Container, Typography, Modal, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlashMessage from './FlashMessage'
import Footer from './Footer'

const EditBlog = ({blog}) => {
    const history = useHistory()
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(true)
    const [editLoad, setEditLoad] = useState(false)
    const {currentUser} = useAuth()
    const [open, setOpen] = useState(false)
    const {editBlog, error} = useContext(BlogContext)
    const [fetchError, setFetchError] = useState('')
    let {id} = useParams();
    const ref = firebase.firestore().collection("blogs").doc(id);

    const onSubmit = async (e) => {
        e.preventDefault();
        setEditLoad(true)
        const editedBlog = {...blog, name, desc, content}
        await editBlog(editedBlog, history);
        setOpen(false)
        setEditLoad(false)
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
            position: 'absolute',
            width: 250,
            left: '50%',
            top: '50%',
            marginTop: -100,
            marginLeft: -150,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4, 3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            textTransform: 'none'
        },
        button: {
            margin: 5
        }
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
        catch(error) {
            setLoading(false)
            setFetchError(error)
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
        <div className={classes.modal}>
            <Grid container justify="center" spacing={2}>
                <Grid item md={12}>
                <Typography align="center">
                <h2 id="simple-modal-title">Confirm changes?</h2>
                </Typography>
                </Grid>
                <Grid item>
                <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>Yes</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleClose}>No</Button>
                </Grid>
            </Grid>
        </div>
    )

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={11} sm={10} md={10} lg={12}>
                    <Box my={4}>
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
                                disabled={editLoad}
                                className={classes.submit} 
                                onClick={handleOpen}>
                                Save changes!
                            </Button>            
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
            {error ? <FlashMessage message={error} error={error}/> : null}
            {fetchError ? <FlashMessage message={fetchError} error={fetchError}/> : null}
            <Box mb={3}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default EditBlog;
