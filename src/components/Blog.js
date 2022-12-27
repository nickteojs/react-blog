import React, {useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button, Modal, Avatar, Hidden, useTheme, useMediaQuery, CircularProgress } from '@material-ui/core';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, fetchBlogs, fetchBlogToEdit } from '../features/blogs/blogsSlice';

const Blog = () => {
    // States - Functional
    const [open, setOpen] = useState(false);
    const [otherBlogs, setOtherBlogs] = useState([]);
    // Redux
    const { user, userInfo } = useSelector(state => state.authSlice);
    const { blogs, loading, recentBlogs, blogToEdit } = useSelector(state => state.blogsSlice);
    const dispatch = useDispatch();

    // Id to fetch blog from firebase
    let { id } = useParams();
    const history = useHistory();

    // Styling
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

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
            lineHeight: '1.6',
            [theme.breakpoints.down('sm')]: {
                fontSize: 15,
            },
        },
        description: {
            fontStyle: 'italic',
            marginBottom: 16
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
        mobileBlogThumbnail: {
            width: '100%',
            height: 250,
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
                fontSize: '1.6rem',
              },
            fontWeight: 'bold',
            marginBottom: 20
        }
    }));

    const classes = useStyles();

    const onSubmit = () => {
        dispatch(deleteBlog(id)).then(result => {
            // Undefined payload = no errors
            if (result.payload === undefined) {
                history.replace("/blogs");
                dispatch(fetchBlogs());
            }
        })
    };
    
    const toggleModal = () => {
        setOpen(!open);
    };

    const scrollTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    
    // Fetch current blog
    useEffect(() => {
        dispatch(fetchBlogToEdit(id));
        if (blogs.length === 0) {
            dispatch(fetchBlogs());
        }
    }, [id]);

    // Set other blogs by filtering this blog from recent blogs
    useEffect(() => {
        setOtherBlogs(recentBlogs.filter(sideblog => sideblog.id !== id))
    }, [blogs, id]);


    const modalBody = (
        <div className={classes.modal}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item md={12}>
                    <Typography align="center">
                        <h2 id="simple-modal-title">Delete blog?</h2>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>
                        {loading ? <CircularProgress size={20} /> : "Yes"}
                    </Button>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={toggleModal}>
                        No
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

    if (loading) {
        return <Box pt={4} textAlign="center">
            <CircularProgress />
        </Box>
    } else if (blogToEdit === undefined) {
        return <Container>
            <Box mt={2} textAlign="center">
                <h3>No such blog!</h3>
            </Box>
        </Container>
    }

    return (
        <Container>
            {blogToEdit && <Box mt={isSmall ? 4 : 8}>
                <Grid container justifyContent="center" spacing={isMedium ? 0 : 8}>
                    <Grid item xs={11} sm={10} md={10} lg={8}>
                        <CardMedia>
                            <img src={blogToEdit.url} className={`${isSmall ? `${classes.mobileBlogThumbnail}` : `${classes.blogThumbnail}`}`} alt=""/>
                        </CardMedia>
                        <Typography gutterBottom className={classes.title} variant="h3">{blogToEdit.name}</Typography>
                        <Typography gutterBottom className={classes.description}>{blogToEdit.desc}</Typography>
                        <Typography variant="overline">{blogToEdit.dateCreated} by {blogToEdit.displayName} - {blogToEdit.topic}.</Typography>
                        <Box mt={2} mb={isSmall ? 2 : 4}>
                            <Typography className={classes.content} variant="body1">{blogToEdit.content}</Typography>
                        </Box>
                        {user && userInfo.email === blogToEdit.email ? 
                            <Link to={{
                                pathname:`/blog/${id}/edit`
                            }}>
                                <Button
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}>
                                    Edit Blog
                                </Button>
                            </Link> 
                        : null}
                        {user && userInfo.email === blogToEdit.email ? 
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                className={classes.button}
                                onClick={toggleModal}>
                                Delete Blog
                            </Button> 
                        : null}
                        <Modal
                            open={open}
                            onClose={toggleModal}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                        {modalBody}
                        </Modal>
                    </Grid>
                    
                    <Grid item xs={11} sm={10} md={10} lg={4}>
                        <Hidden mdDown>
                            <Box textAlign="center">
                                <Grid item>
                                    <Card variant="outlined">
                                        <Avatar style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}></Avatar>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">Author: {blogToEdit.displayName}</Typography>
                                            <Typography variant="body2" component="p" colo="textSecondary">{blogToEdit.bio}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Box>
                        </Hidden>
                        <Box mt={8}>
                            <Typography gutterBottom className={classes.otherTitle}>OTHER POSTS</Typography>
                            {otherBlogs.map(blog => (
                                <Grid container spacing={2} alignItems="center" key={blog.id}>
                                    <Grid item lg={5} onClick={scrollTop}>
                                        <Link to={{
                                            pathname: `/blog/${blog.id}`,
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
            </Box>}
            <Box mb={3}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default Blog;
