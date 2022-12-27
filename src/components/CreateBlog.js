import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, InputLabel, Box, Container, Select, MenuItem, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog as addBlogRedux, fetchBlogs } from '../features/blogs/blogsSlice';
import Footer from './Footer';
import useAuth from '../authUpdater';

const CreateBlog = () => {
    // State - Blog Information
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [topic, setTopic] = useState('');

    // Redux
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.authSlice);
    const { loading } = useSelector(state => state.blogsSlice);
    const { bio, displayName, email } = userInfo;

    const history = useHistory();
    const authUser = useAuth();

    const useStyles = makeStyles((theme) => ({
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const setImageFile = e => {
        setImage(e.target.files[0]);
    }

    const onSubmitRedux = e => {
        e.preventDefault();
        dispatch(addBlogRedux({name, desc, content, topic, image, email, bio, displayName}))
            .then(result => {
                // Undefined payload = no errors
                if (result.payload === undefined) {
                    history.replace("/");
                    dispatch(fetchBlogs());
                }
            })
    }

    // Auth Listener to redirect
    useEffect(() => {
        if (!authUser) {
            history.push("/login");
        }
    }, [authUser]);

    if (authUser === "loading") {
        return <Box pt={4} textAlign="center">
        <CircularProgress />
    </Box>
    }
    
    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={11} sm={10} md={10} lg={12}>
                    <Box mt={4}>
                        <form onSubmit={onSubmitRedux}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Post Name"
                                type="text"
                                value={name}
                                autoFocus
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
                                onChange = {(e) => setDesc(e.target.value)}
                                >
                            </TextField>
                            <TextField
                                multiline
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="What are your thoughts?"
                                type="text"
                                value={content}
                                onChange = {(e) => setContent(e.target.value)}
                                >
                            </TextField>
                            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={topic}
                                required
                                onChange = {(e) => {
                                    setTopic(e.target.value)
                                }}>
                                <MenuItem value={"Travel"}>Travel</MenuItem>
                                <MenuItem value={"Health"}>Health</MenuItem>
                                <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                                <MenuItem value={"Food"}>Food</MenuItem>
                                <MenuItem value={"Sports"}>Sports</MenuItem>
                                <MenuItem value={"Self-Improvement"}>Self-Improvement</MenuItem>
                                <MenuItem value={"Hobby"}>Hobby</MenuItem>
                                <MenuItem value={"Art"}>Art</MenuItem>
                            </Select>
                            <Box mt={2}>
                                <Box mb={2}>
                                    <InputLabel>
                                    Upload a thumbnail! (Image has to be less than 1MB.)
                                    </InputLabel>
                                </Box> 
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={setImageFile}>
                                </input>
                            </Box>
                            <Button
                                variant="contained" 
                                color="primary" 
                                disabled={loading}
                                className={classes.submit} 
                                type="submit">
                                {loading ? <CircularProgress size={20} /> : "Create Post!"}
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={6}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default CreateBlog;