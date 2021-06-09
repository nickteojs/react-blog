import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {BlogContext} from '../context/BlogContext'
import firebase from '../firebase'
import Loader from './Loader'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button, Modal, Avatar, Hidden, useTheme, useMediaQuery} from '@material-ui/core'
import FlashMessage from './FlashMessage'

const Blog = (props) => {
    // States - Blog Content
    const [blog, setBlog]= useState()
    const [image, setImage] = useState('')
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('')
    const [desc, setDesc] = useState('');
    const [dateCreated, setDateCreated] = useState('')
    const [display, setDisplay] = useState('')
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [authBio, setAuthBio] = useState('')
   
    // States - Functional
    const [loading, setLoading] = useState(true)
    const [deleteLoad, setDeleteLoad] = useState(false)
    const [open, setOpen] = useState(false)
    const [otherBlogs, setOtherBlogs] = useState([])

    // Hooks
    // Current User to see if edit and delete buttons should be displayed
    const {currentUser} = useAuth();
    const {removeBlog, error, blogs, success} = useContext(BlogContext)
    const history = useHistory()
    // Id to fetch blog from firebase
    let {id} = useParams()
    const ref = firebase.firestore().collection("blogs").doc(id);
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));

    const useStyles = makeStyles((theme) => ({
        modal: {
            position: 'absolute',
            width: 200,
            left: '50%',
            top: '50%',
            marginTop: -100,
            marginLeft: -125,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4, 3),
        },
        content: {
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6'
        },
        description: {
            fontStyle: 'italic'
        },
        button: {
            marginRight: 10,
            textTransform: 'none'
        },
        blogThumbnail: {
            width: '100%',
            height: 500,
            objectFit: 'cover',
            marginBottom: '1.2em'
        },
        otherBlogThumbnail: {
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
        },
        otherBlog: {
            textTransform: 'uppercase',
            fontWeight: '600'
        },
        otherTitle: {
            marginBottom: 20,
            letterSpacing: 2,
            fontWeight: '600',
            borderBottom: '3px solid black',
            paddingBottom: 10
        },
        title: {
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
              },
        }
      }));

    const classes = useStyles();

    const blogFetcher = () => {
        ref.get().then((doc) => {
            if (doc.exists) {
                setLoading(false)
                const {url, name, topic, desc, dateCreated, display, content, author, authBio, id, timeCreated} = doc.data()
                const dataBlog = {
                    authBio: authBio,
                    id: id,
                    dateCreated: dateCreated,
                    timeCreated: timeCreated,
                    desc: desc,
                    author: author,
                    display: display,
                    url: url,
                    content: content,
                    name: name,
                    topic: topic
                }
                setBlog(dataBlog)
                setName(name)
                setDesc(desc)
                setContent(content)
                setAuthor(author)
                setImage(url)
                setDisplay(display)
                setDateCreated(dateCreated)
                setTopic(topic)
                setAuthBio(authBio)
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const onSubmit = async () => {
        setDeleteLoad(true)
        await removeBlog(blog, history);
        setDeleteLoad(false)
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        blogFetcher();
    }, [props.match.params.id])

    useEffect(() => {
        setOtherBlogs(blogs.filter(sideblog => sideblog.id !== id))
    }, [blogs, props.match.params.id])

    const modalBody = (
        <div className={classes.modal}>
            <Grid container justify="center" spacing={2}>
                <Grid item md={12}>
                <Typography align="center">
                <h2 id="simple-modal-title">Delete blog?</h2>
                </Typography>
                </Grid>
                <Grid item>
                <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>Yes</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleClose}>No</Button>
                </Grid>
            </Grid>
        </div>
    )

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Box my={8}>
                <Grid container justify="center" spacing={isMedium ? 0 : 8}>
                    <Grid item xs={11} sm={10} md={10} lg={8}>
                        <CardMedia>
                            <img src={image} className={classes.blogThumbnail} alt=""/>
                        </CardMedia>
                        <Typography className={classes.title} gutterBottom variant="h3">{name}</Typography>
                        <Typography gutterBottom variant="h6">{topic}</Typography>
                        <Typography gutterBottom className={classes.description}>{desc}</Typography>
                        <Typography variant="overline">{dateCreated} by {display}</Typography>
                        <Box mt={2} mb={4}>
                            <Typography className={classes.content} variant="body1">{content}</Typography>
                        </Box>
                        {currentUser && currentUser.email === author ? 
                            <Link to={{
                                pathname:`/blogs/${id}/edit`
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
                        {currentUser && currentUser.email === author ? 
                            <Button 
                                alignItems="center" 
                                variant="contained" 
                                color="secondary" 
                                className={classes.button}
                                disabled={deleteLoad}
                                onClick={handleOpen}>
                                Delete Blog
                            </Button> 
                        : null}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                        {modalBody}
                        </Modal>
                        {error ? <FlashMessage message={error} error={error}/> : null}                
                    </Grid>
                    
                    <Grid item xs={11} sm={10} md={10} lg={4}>
                        <Hidden mdDown>
                            <Box textAlign="center">
                                <Grid item>
                                    <Card variant="outlined">
                                        <Avatar style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}></Avatar>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">Author: {display}</Typography>
                                            <Typography variant="body2" component="p" colo="textSecondary">{authBio}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Box>
                        </Hidden>
                        <Box mt={8}>
                            <Typography gutterBottom className={classes.otherTitle}>OTHER POSTS</Typography>
                            {otherBlogs.map(blog => (
                                <Grid container spacing={2} alignItems="center" key={blog.id}>
                                    <Grid item lg={5}>
                                        <Link to={{
                                            pathname: `/blogs/${blog.id}`,
                                            state: {blog} }}>                                    
                                            <img src={blog.url} alt="Blog Thumbnails" className={classes.otherBlogThumbnail}></img>
                                        </Link>
                                    </Grid>
                                    <Grid item lg={7}>
                                        <Typography variant="overline">{blog.topic}</Typography>
                                        <Box mb={isMedium ? 4 : 0}>
                                            <Typography gutterBottom variant="body1" className={classes.otherBlog}>{blog.name}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        {success ? <FlashMessage message={success} success={success} /> : null}
        </Container>
    )
}

export default Blog
