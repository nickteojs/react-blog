import React, {useContext, useEffect, useState} from 'react'
import Loader from './Loader'
import {Link} from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import {useAuth} from '../context/AuthContext'
import auth from '../firebase'
import firebase from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../media/hero2.jpg'
import {Avatar, Box, Container, Card, CardActionArea, CardMedia, CardActions, Grid, CardContent, Typography, Button} from '@material-ui/core'

const RecentBlogs = () => {
    const {blogs, loading} = useContext(BlogContext);
    const {currentUser} = useAuth()
    const [display, setDisplay] = useState()
    const ref = firebase.firestore().collection("users");

    useEffect(() => {
        if (currentUser) {
            ref.doc(currentUser.uid).get().then(doc => {
                setDisplay(doc.data().displayName)
            })
        }
    }, [currentUser])

    useEffect(() => {
        blogs.sort((a,b) => {
          return b.timeCreated - a.timeCreated;
        })
      }, [blogs])

    const useStyles = makeStyles({
        hero: {
            height: `100vh`,
            backgroundImage: `url(${Hero})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            paddingBottom: 64,
        },
        card: {
          marginTop: 20,
          marginBottom: 20,
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
        blogTitle: {
            textTransform: 'uppercase'
        }
      });

      const classes = useStyles();

    if (loading) {
        return <Loader />
    }

    return (
            <Grid container alignItems="flex-end">
                <Grid container alignItems="center" justify="center" className={classes.hero} item xs={10} md={12}>
                    <Box my={7} textAlign={{xs: 'center'}}>
                            <Typography gutterBottom variant="h2" className={classes.bold}>Welcome to Story!</Typography>
                            <Typography variant="p">Share your stories with people from around the world!</Typography>
                        <Box mt={4}>
                        <Link to="/create"><Button variant="contained" size="medium" color="primary">Create</Button></Link>
                        </Box>
                    </Box>
                </Grid>
                {/* <Grid item md={4}>
                    <Box my={10} textAlign="center">
                    <Card variant="outlined">
                        <Avatar style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}></Avatar>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{currentUser ? `Welcome, ${display}!` : "Not logged in"}</Typography>
                            <Typography variant="body2" component="p" colo="textSecondary">Your posts:</Typography>
                        </CardContent>
                    </Card>
                    </Box>
                </Grid> */}
                <Grid item md={12}>
                <Box textAlign={{xs: 'center', sm:'left'}}>
                    <div><h1>Recent Posts</h1></div>
                    </Box>
                </Grid>
                <Grid container>
                {blogs.slice(0,3).map(blog => (
                    <Grid item container justify="space-between" md={4}>
                        <Card variant="outlined" className={classes.card} key={blog.id}>
                            <CardActionArea>
                                <Link to={{
                                    pathname: `/blogs/${blog.id}`
                                }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    src={blog.url}
                                />
                                <CardContent className={classes.blogTitle}>
                                <Typography className={classes.bold} variant="h5" component="h2">{blog.name}</Typography>
                                <Typography variant="body2" component="p" colo="textSecondary">{blog.desc}</Typography>
                                </CardContent>
                                </Link>
                                </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
                </Grid>
    )
}

export default RecentBlogs
