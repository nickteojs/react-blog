import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import FlashMessage from './FlashMessage'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core'

const Blogs = () => {
    const {blogs, loading, success} = useContext(BlogContext);
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
          margin: 20
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
        <Card variant="outlined" className={classes.root}>
            {blogs.map(blog => (
                <Link to={{
                    pathname:`/blogs/${blog.id}`,
                    state: {
                        blog,
                    }
                }} 
                    key={blog.id}>
                    <CardContent>
                    <h1>{blog.name}</h1>
                    <p>{blog.author}</p>
                    </CardContent>
                </Link>
            ))}
            {success ? <FlashMessage message={success} success={success}/> : null}
        </Card>
    )
}

export default Blogs
