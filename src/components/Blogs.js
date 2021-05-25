import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import FlashMessage from './FlashMessage'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardContent, CardActionArea, CardMedia, Typography, Box, Container} from '@material-ui/core'

const Blogs = () => {
    const {blogs, loading, success} = useContext(BlogContext);
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
      });

      const classes = useStyles();

    if (loading) {
        return <Loader />
    }
    return (
        <Container>
        <Box my={4}>
        <Grid container justify="center"> 
            {blogs.map(blog => (
                <Grid container item xs={10} md={6} lg={4} justify="center">
                <Card variant="outlined" className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            src={blog.url} 
                        />
                        <Link to={{
                            pathname:`/blogs/${blog.id}`,
                            state: {blog}
                        }} 
                            key={blog.id}>
                                <Box textAlign="center">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">{blog.name}</Typography>
                                        <Typography gutterBottom variant="body2" component="p" colo="textSecondary">{blog.desc}</Typography>
                                        <Typography variant="body2" component="p" colo="textSecondary">By: {blog.display}</Typography>
                                    </CardContent>
                                </Box>
                        </Link>
                    </CardActionArea>
                </Card>
                </Grid>
            ))}
            {success ? <FlashMessage message={success} success={success}/> : null}
        </Grid>
        </Box>
        </Container>
    )
}

export default Blogs
