import React, {useContext} from 'react'
import Loader from './Loader'
import { BlogContext } from '../context/BlogContext'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, Grid} from '@material-ui/core'

const RecentBlogs = () => {
    const {blogs, loading} = useContext(BlogContext);

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
            <div><h1>Recent Blogs</h1></div>
            {blogs.map(blog => (
                <Card variant="outlined" className={classes.root}
                    key={blog.id}>
                    <h1>{blog.name}</h1>
                    <p>By: {blog.author}</p>
                    <button>View</button>
                </Card>
            ))}
        </Container>
    )
}

export default RecentBlogs
