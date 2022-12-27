import React, { useEffect } from 'react';
import {Link, useHistory, useParams, useLocation} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardContent, CardActionArea, CardMedia, Typography, Box, Container, CircularProgress, Hidden, AppBar, Toolbar} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPage, filterBlogs, fetchBlogs } from '../features/blogs/blogsSlice';
import FilterRows from './FilterRows';
import { Pagination } from '@material-ui/lab';
import Footer from './Footer';

const Blogs = () => {
    const { blogs, currentPage, currentPageBlogs, totalPages, loading, wrongPage } = useSelector(state => state.blogsSlice);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    const paramInfo = {
        category: params.category,
        pageNumber: +params.pageNumber,
        type: "direct"
    }

    const useStyles = makeStyles({
        card: {
            maxWidth: 370,
            marginTop: 20,
            marginBottom: 20
          },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        active: {
            fontWeight: 'bold'
        },
        topicBar: {
            background: 'none',
            boxShadow: 'none',
            color: 'black',
            fontWeight: '500'
        },
        override: {
            paddingLeft: 0,
            paddingRight: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
      });

    const classes = useStyles();

    const handlePageChange = event => {
        const pageNumber = +event.target.innerText;
        dispatch(setBlogPage(pageNumber));
        if (params.category) {
            history.push(`/blogs/category/${params.category}/${pageNumber}`);
        } else {
            history.push(`/blogs/all/${pageNumber}`)
        }
    }
    
    useEffect(() => {
        if (blogs.length !== 0 && history.action === "POP") {
            dispatch(filterBlogs(paramInfo));
        }
    }, [location.pathname]);

    useEffect(() => {
        const asyncFetchBlogs = async () => {
            await dispatch(fetchBlogs());
            dispatch(filterBlogs(paramInfo));
        }
        if (blogs.length === 0) {
            asyncFetchBlogs();
        }
    }, []);

    useEffect(() => {
        if (wrongPage && params.category === undefined) {
            history.replace(`/blogs/all/1`);
        } else if (wrongPage && params.category) {
            history.replace(`/blogs/category/${params.category}/1`);
        }
    }, [wrongPage]);

    if (loading) {
        return (
            <Box pt={4} textAlign="center">
                <CircularProgress />
            </Box>    
        )
    }

    return (
        <Container>
            <Box mb={8}>
                <Grid container justifyContent="center">
                    <Hidden xsDown>
                        <Grid item sm={10} md={10} lg={12}>
                        <Box my={2}>
                            <AppBar className={classes.topicBar} position="static">
                                <Toolbar className={classes.override}>
                                    <FilterRows />
                                </Toolbar>
                            </AppBar>
                        </Box>
                        </Grid>
                    </Hidden>
                    </Grid>
                    <Box display="flex" justifyContent='center'>
                        <Pagination 
                            page={currentPage} 
                            count={totalPages} 
                            hideNextButton={true}
                            hidePrevButton={true}
                            onChange={e => handlePageChange(e)}
                        />
                    </Box>
                <Grid container justifyContent="center"> 
                    {currentPageBlogs.map(blog => (
                        <Grid container key={blog.id} item xs={10} md={6} lg={4} justifyContent="center">
                            <Card variant="outlined" className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        src={blog.url} 
                                    />
                                    <Link to={{
                                        pathname:`/blog/${blog.id}`,
                                        state: {blog}
                                    }}>
                                        <Box textAlign="center">
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">{blog.name}</Typography>
                                                <Typography gutterBottom variant="body2" component="p" colo="textSecondary">{blog.desc}</Typography>
                                                <Typography variant="body2" component="p" colo="textSecondary">By: {blog.displayName}</Typography>
                                                <Typography variant="body2" component="p" colo="textSecondary">{blog.dateCreated}</Typography>
                                            </CardContent>
                                        </Box>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent='center'>
                    <Pagination 
                        page={currentPage} 
                        count={totalPages} 
                        hideNextButton={true}
                        hidePrevButton={true}
                        onChange={e => handlePageChange(e)}
                    />
                </Box>
            </Box>
            <Box mb={3}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default Blogs;
