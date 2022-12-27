import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, CardMedia, Grid, Typography, AppBar, Toolbar, Hidden, useTheme, useMediaQuery, CircularProgress } from '@material-ui/core';
import Footer from './Footer';
import FilterRows from './FilterRows';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, resetFilter } from '../features/blogs/blogsSlice';

const RecentBlogs = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch();
    const { blogs, loading, recentBlogs } = useSelector(state => state.blogsSlice);

    const useStyles = makeStyles({
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
        card: {
          marginTop: 20,
          marginBottom: 20,
          color: 'black',
          borderRadius: 10,
        },
        bold: {
            fontWeight: 'bold',
        },
        active: {
            borderBottom: '2px solid black',
            cursor: 'pointer'
        },
        filterItem: {
            cursor: 'pointer'
        },
        topic: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 14,
            paddingBottom: 6,
            borderTop: '4px solid black',
            display: 'inline-block',
            textTransform: 'uppercase',
            fontWeight: 'bold',
        }
    });

    const classes = useStyles();

    // Resets filter at home page, then fetch blogs if they don't exist
    useEffect(() => {
        dispatch(resetFilter());
        if (blogs.length === 0) {
            dispatch(fetchBlogs());
        }
    }, []);

    if (loading) {
        return (
            <Box pt={4} textAlign="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container>
            <Box mb={8} mt={isSmall ? 2 : 0}>
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
                <Box textAlign="center" my={4}>
                    <Typography gutterBottom variant="h5">Recent Posts</Typography>
                </Box>            
                <Grid container justifyContent="center" spacing={isSmall ? 3 : 6}>
                    {recentBlogs.map(blog => (
                        <Grid item container className="blog-card" justifyContent="space-between" xs={11} sm={10} md={5} lg={6} key={blog.id}>
                            <Box width="100%">
                                <Link to={{
                                    pathname: `/blog/${blog.id}`,
                                    state: {blog} }}>
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        className={classes.card}
                                        src={blog.url}
                                    />
                                    <Typography className={classes.topic} variant="subtitle1" component="h2"><span>{blog.topic}</span></Typography>
                                    <Typography className={classes.bold} variant="h5">{blog.name}</Typography>
                                    <Typography variant="subtitle2">{blog.dateCreated} by {blog.displayName}</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        
                    ))}
                </Grid>
            </Box>
            <Box mb={3}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default RecentBlogs;
