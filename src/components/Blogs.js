import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import FlashMessage from './FlashMessage'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography, Container, Box} from '@material-ui/core'

const Blogs = () => {
    const {blogs, loading, success} = useContext(BlogContext);
    const useStyles = makeStyles({
        root: {
          maxWidth: 275,
          margin: 20,
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
            {blogs.map(blog => (
                <Card variant="outlined" className={classes.root}>
                <Link to={{
                    pathname:`/blogs/${blog.id}`,
                    state: {
                        blog,
                    }
                }} 
                    key={blog.id}>
                        <Box textAlign="center">
                        <CardContent>
                    <h1>{blog.name}</h1>
                    <p>{blog.author}</p>
                    </CardContent>
                        </Box>
                    
                </Link>
                </Card>
            ))}
            {success ? <FlashMessage message={success} success={success}/> : null}
        </Container>
    )
}

export default Blogs
