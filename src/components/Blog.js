import React, {useState, useEffect, useContext} from 'react'
import {Link, useLocation, useParams, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import firebase from '../firebase'
import Loader from './Loader'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardContent, CardActionArea, CardMedia, Typography, Box, Button, Modal} from '@material-ui/core'
import FlashMessage from './FlashMessage'

const Blog = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [dateCreated, setDateCreated] = useState('')
    const [image, setImage] = useState('')
    const [display, setDisplay] = useState('')
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
        palette: {
            error: {
                main: '#e57373'
            }
        },
        content: {
            whiteSpace: 'pre-wrap'
        },
        description: {
            fontStyle: 'italic'
        },
        button: {
            marginRight: 10
        },
        blogContent: {
            paddingLeft: 50,
            paddingRight: 50,
            marginBottom: 20
        }
      }));

    const classes = useStyles();

    const blogFetcher = () => {
        ref.get().then((doc) => {
            if (doc.exists) {
                setLoading(false)
                const {author, content, desc, name, url, display, dateCreated} = doc.data()
                setName(name)
                setDesc(desc)
                setContent(content)
                setAuthor(author)
                setImage(url)
                setDisplay(display)
                setDateCreated(dateCreated)
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
        <Box my={10}>
            <Grid container justify="center">
                <Grid item xs={10} md={9}>
                    <Card>
                        <CardMedia>
                <img src={image} alt="" className="thumbnail"/>
                </CardMedia>
                <CardContent className={classes.blogContent}>
                <Typography gutterBottom variant="h3">{name}</Typography>
                <Typography gutterBottom className={classes.description}>{desc}</Typography>
                <Typography variant="overline">{dateCreated} by {display}</Typography>
                <Box mt={2} mb={4}>
                    <Typography className={classes.content} variant="body1">{content}</Typography>
                </Box>
                {currentUser.email === blog.author ? 
                    <Link to={{
                        pathname:`/blogs/${blog.id}/edit`
                    }}>
                        <Button
                            alignItems="center" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick={handleOpen}>
                            Edit Blog
                        </Button>
                    </Link> 
                : null}
                {currentUser.email === blog.author ? 
                    <Button 
                        alignItems="center" 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleOpen}>
                        Delete Blog
                    </Button> 
                : null}
                </CardContent>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                {modalBody}
                </Modal>
                {error ? <FlashMessage message={error} error={error}/> : null}
                </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Blog
