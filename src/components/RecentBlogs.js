import React, {useContext, useEffect} from 'react'
import Loader from './Loader'
import {Link} from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import {useAuth} from '../context/AuthContext'
import { makeStyles } from '@material-ui/core/styles';
import {Box, Container, Card, CardActionArea, CardMedia, CardActions, Grid, CardContent, Typography, Button} from '@material-ui/core'

const RecentBlogs = () => {
    const {blogs, loading} = useContext(BlogContext);
    const {currentUser} = useAuth()

    useEffect(() => {
        blogs.sort((a,b) => {
          return b.timeCreated - a.timeCreated;
        })
      }, [blogs])

    const useStyles = makeStyles({
        root: {
          maxWidth: 320,
          marginTop: 20,
          marginBottom: 20,
          marginRight: 20
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        bold: {
            fontWeight: 'bold'
        },
        sticky: {
            position: 'sticky'
        }
      });

      const classes = useStyles();

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid container>
                <Grid item md={8}>
                    <Box my={7}>
                    <Grid container>
                        <Grid item md={12}>
                            <Typography gutterBottom variant="h2" className={classes.bold}>Welcome to Story!</Typography>
                            <Typography variant="p">Share your stories with people from around the world!</Typography>
                        </Grid>
                        <Box mt={4}>
                        <Button variant="contained" size="medium" color="primary"><Link to="/create">Create</Link></Button>
                        </Box>
                    </Grid>
                    </Box>
                    <div><h1>Recent Blogs</h1></div>
                </Grid>
                <Grid item md={4}>
                    <Box my={10}>
                    <Card variant="outlined" className={classes.root}>
                        <img src="https://via.placeholder.com/50x50"></img>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{currentUser ? `Welcome ${currentUser.email}!` : "Not logged in"}</Typography>
                            <Typography variant="body2" component="p" colo="textSecondary">Your posts:</Typography>
                        </CardContent>
                    </Card>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                {blogs.slice(0,4).map(blog => (
                    <Grid item md={3}>
                        <Card variant="outlined" className={classes.root} key={blog.id}>
                            <CardActionArea>
                                <CardMedia>
                                    <img src="https://via.placeholder.com/286x140"></img>
                                </CardMedia>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{blog.name}</Typography>
                                <Typography variant="body2" component="p" colo="textSecondary">By: {blog.author}</Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Button variant="contained" size="small" color="primary">View</Button>
                                </CardActions>
                        </Card>
                    </Grid>
                ))}
                </Grid>
        </Container>
    )
}

export default RecentBlogs
