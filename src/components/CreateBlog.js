import { useState, useContext, useEffect } from 'react'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {useHistory} from 'react-router-dom'
import {Button, TextField, InputLabel, Box, Container, Select, MenuItem, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlashMessage from './FlashMessage'
import firebase from '../firebase'
import Footer from './Footer'

const CreateBlog = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [display, setDisplay] = useState()
    const [authBio, setAuthBio] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [topic, setTopic] = useState('')
    const {currentUser} = useAuth()
    const [author, setAuthor] = useState(currentUser.email)
    const {addBlog, error} = useContext(BlogContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const timeCreated = (new Date()).getTime();
    const ref = firebase.firestore().collection("users");
    const storageRef = firebase.storage().ref()

    const useStyles = makeStyles((theme) => ({
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const months = {
        '1': 'Jan',
        '2' : 'Feb',
        '3' : 'Mar',
        '4' : 'Apr',
        '5' : 'May',
        '6' : 'Jun',
        '7' : 'Jul',
        '8' : 'Aug',
        '9' : 'Sep',
        '10' : 'Oct',
        '11' : 'Nov',
        '12' : 'Dec',
    }

    let dateCreated = new Date();
    let dd = dateCreated.getDate();
    let mm = dateCreated.getMonth()+1;
    let yy = dateCreated.getFullYear();

    if (dd<10){
        dd='0'+dd
    } 

    dateCreated = (`${months[mm]} ${dd}, ${yy}`).toString();

    const onChange = (e) => {
        setImage(e.target.files[0])
    }

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const id = (Math.floor(Math.random() * 10000) + 1).toString();
        await storageRef.child(image.name).put(image)
        await storageRef.child(image.name).getDownloadURL()
            .then(url => {
                setUrl(url)
                addBlog({name, desc, content, id, author, timeCreated, dateCreated, display, authBio, url, topic}, history);
                setLoading(false)
            })
        setName('');
        setDesc('');
        setContent('');
        setTopic('')
    }

    useEffect(() => {
        if (currentUser) {
            ref.doc(currentUser.uid).get().then(doc => {
                setDisplay(doc.data().displayName)
            })
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser) {
            ref.doc(currentUser.uid).get().then(doc => {
                setAuthBio(doc.data().bioName)
            })
        }
    }, [currentUser])

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={11} sm={10} md={10} lg={12}>
                    <Box mt={4}>
                        <form onSubmit={onSubmit}>
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
                                    onChange={onChange}>
                                </input>
                            </Box>
                            <Button
                                alignItems="center" 
                                variant="contained" 
                                color="primary" 
                                disabled={loading}
                                className={classes.submit} 
                                type="submit">
                                {loading ? 'Creating...' : 'CREATE POST!'}
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            {error ? <FlashMessage message={error} error={error}/> : null}
            <Box mt={12}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default CreateBlog
