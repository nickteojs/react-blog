import { useState, useContext, useEffect } from 'react'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {useHistory} from 'react-router-dom'
import {Button, TextField, InputLabel, Box, Container, Typography, Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../firebase'

const CreateBlog = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [display, setDisplay] = useState()
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const {currentUser} = useAuth()
    const [author, setAuthor] = useState(currentUser.email)
    const {loading, addBlog} = useContext(BlogContext)
    const history = useHistory()
    const timeCreated = (new Date()).getTime();
    const ref = firebase.firestore().collection("users");
    const storageRef = firebase.storage().ref()

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

    useEffect(() => {
        if (currentUser) {
            ref.doc(currentUser.uid).get().then(doc => {
                setDisplay(doc.data().displayName)
            })
        }
    }, [currentUser])

    if(dd<10){
        dd='0'+dd
    } 

    dateCreated = (`${months[mm]} ${dd}, ${yy}`).toString();

    const onChange = (e) => {
        setImage(e.target.files[0])
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const uploadTask = storageRef.child(image.name).put(image)
        const id = (Math.floor(Math.random() * 10000) + 1).toString();
        await storageRef.child(image.name).getDownloadURL()
            .then(url => {
                setUrl(url)
                addBlog({name, desc, content, id, author, timeCreated, dateCreated, display, url}, history);
            })
        setName('');
        setDesc('');
        setContent('');
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
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

    return (
        <Container>
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
                    <Box mt={2}>
                        <Box mb={2}>
                        <InputLabel>
                        Upload a thumbnail! (Image has to be less than 1MB.)
                        </InputLabel>
                        </Box> 
                        <input
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        >
                        </input>
                    </Box>
                    
                    <Button
                        alignItems="center" 
                        variant="contained" 
                        color="primary" 
                        disabled={loading}
                        className={classes.submit} 
                        type="submit">
                        Create Post!
                    </Button>
            </form>
        </Container>
    )
}

export default CreateBlog
