import { useState, useContext } from 'react'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import {useHistory} from 'react-router-dom'
import {Button, TextField, Link, Box, Container, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const CreateBlog = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const {currentUser} = useAuth()
    const [author, setAuthor] = useState(currentUser.email)
    const {loading, addBlog} = useContext(BlogContext)
    const history = useHistory()
    const timeCreated = (new Date()).getTime();

    let dateCreated = new Date();
    let dd = dateCreated.getDate();
    let mm = dateCreated.getMonth()+1;
    let yy = dateCreated.getFullYear();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    dateCreated = (`${yy}-${mm}-${dd}`).toString();

    const onSubmit = (e) => {
        e.preventDefault();
        const id = (Math.floor(Math.random() * 10000) + 1).toString();
        addBlog({name, desc, content, id, author, timeCreated, dateCreated}, history);
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
