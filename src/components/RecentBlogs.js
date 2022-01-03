import React, {useContext, useEffect} from 'react'
import Loader from './Loader'
import {Link} from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import { makeStyles } from '@material-ui/core/styles';
import {Box, Container, CardMedia, Grid, Typography, AppBar, Toolbar, Hidden, useTheme, useMediaQuery} from '@material-ui/core'
import Footer from './Footer'

const RecentBlogs = () => {
    const {blogs, loading, statusHandler, filteredBlogs, status} = useContext(BlogContext)
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

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
        },
        bold: {
            fontWeight: 'bold',
            textTransform: 'uppercase'
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
            fontWeight: '500'
        }
    });

    const classes = useStyles();

    const dateSorter = () => {
        blogs.sort((a,b) => {
            return b.timeCreated - a.timeCreated
          })
    }

    useEffect(() => {
        dateSorter()
    }, [blogs])

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Box mb={8} mt={isSmall ? 2 : 0}>
                <Grid container justify="center">
                    <Hidden xsDown>
                        <Grid item sm={10} md={10} lg={12}>
                        <Box my={2}>
                            <AppBar className={classes.topicBar} position="static">
                                <Toolbar className={classes.override}>
                                <li className={`${status === "all" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("all")}}>ALL</li>
                                <li className={`${status === "Travel" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Travel")}}>TRAVEL</li>
                                <li className={`${status === "Health" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Health")}}>HEALTH</li>
                                <li className={`${status === "Lifestyle" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Lifestyle")}}>LIFESTYLE</li>
                                <li className={`${status === "Food" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Food")}}>FOOD</li>
                                <li className={`${status === "Sports" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Sports")}}>SPORTS</li>
                                <li className={`${status === "Self-Improvement" ? `${classes.active}` : `${classes.filterItem}`}`} onClick={() => {statusHandler("Self-Improvement")}}>SELF-IMPROVEMENT</li>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container justify="center" spacing={isSmall ? 3 : 6}>
                    {filteredBlogs.map(blog => (
                        <Grid item container className="blog-card" justify="space-between" xs={11} sm={10} md={5} lg={6} key={blog.id}>
                            <Box width="100%">
                                <Link to={{
                                    pathname: `/blogs/${blog.id}`,
                                    state: {blog} }}>
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        className={classes.card}
                                        src={blog.url}
                                    />
                                    <Typography className={classes.topic} variant="subtitle1" component="h2"><span>{blog.topic}</span></Typography>
                                    <Typography className={classes.bold} variant="h5">{blog.name}</Typography>
                                    <Typography variant="subtitle2">{blog.dateCreated} by {blog.display}</Typography>
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

export default RecentBlogs
