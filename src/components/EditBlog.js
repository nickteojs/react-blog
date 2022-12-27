import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, Box, Container, Typography, Modal, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { editBlog, fetchBlogs, fetchBlogToEdit } from '../features/blogs/blogsSlice';
import useAuth from '../authUpdater';

const EditBlog = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const authUser = useAuth();

    // Redux
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.authSlice);
    const { blogToEdit, loading } = useSelector(state => state.blogsSlice);
    let { id } = useParams();

    // Get Blog
    useEffect(() => {
        dispatch(fetchBlogToEdit(id));
    }, []);

    // Set Inputs
    useEffect(() => {
        if (Object.keys(blogToEdit) !== 0) {
            setName(blogToEdit.name);
            setDesc(blogToEdit.desc);
            setContent(blogToEdit.content);
        }
    }, [loading]);

    // Auth Listener to redirect
    useEffect(() => {
        if (Object.keys(authUser).includes("uid") && !loading) {
            if (authUser.email !== blogToEdit.email) {
                history.replace("/");
            }
        }
    }, [authUser]);
    
    const onSubmit = e => {
        e.preventDefault();
        dispatch(editBlog({...blogToEdit, name, desc, content})).then(result => {
            if (result.payload === undefined) {
                history.replace(`/blogs/${id}`);
                dispatch(fetchBlogs());
            }
        })
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
        button: {
            marginTop: 14,
            marginRight: 10,
            textTransform: 'none'
        }
    }));

    const classes = useStyles();
    
    const toggleModal = () => {
        setOpen(!open);
    }
    
    const modalBody = (
        <div className={classes.modal}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item md={12}>
                    <Typography align="center">
                        <h2 id="simple-modal-title">Confirm changes?</h2>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>
                        {loading ? <CircularProgress size={20} /> : "Yes"}
                    </Button>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={toggleModal}>No</Button>
                </Grid>
            </Grid>
        </div>
    ) 

    if (loading || Boolean(authUser === false)) {
        return <Box pt={4} textAlign="center">
        <CircularProgress />
    </Box>
    }

    return (
        <Container>
            <Grid container justifyContent="center">
                {!loading && <Grid item xs={11} sm={10} md={10} lg={12}>
                    <Box my={4}>
                        <form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Post Name"
                                type="text"
                                value={name ? name : ""}
                                autoFocus
                                disabled={userInfo.email !== blogToEdit.email}
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
                                value={desc ? desc : ""}
                                disabled={userInfo.email !== blogToEdit.email}
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
                                value={content ? content : ""}
                                multiline
                                disabled={userInfo.email !== blogToEdit.email}
                                onChange = {(e) => setContent(e.target.value)}
                                >
                            </TextField>
                            <Button
                                variant="contained" 
                                color="primary" 
                                disabled={loading}
                                className={classes.button} 
                                onClick={toggleModal}>
                                Save changes
                            </Button>
                            <Button
                                variant="contained" 
                                color="secondary" 
                                disabled={loading}
                                className={classes.button} 
                                onClick={history.goBack}>
                                Return
                            </Button>
                        </form>
                    </Box>
                </Grid>}
            </Grid>
            <Modal
                open={open}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
            <Box mb={3}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default EditBlog;
