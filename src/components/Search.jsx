import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, TextField, Typography, makeStyles, InputBase, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import Footer from './Footer';
import SearchIconOutlined from '@material-ui/icons/SearchOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, searchBlogs } from '../features/blogs/blogsSlice';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const { searchResults, loading } = useSelector(state => state.blogsSlice);

    const useStyles = makeStyles((theme) => ({
        root: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        form: {
          width: '100%', // Fix IE 11 issue.
        },
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
    }));

    const classes = useStyles();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(searchBlogs(searchInput));
    }

    useEffect(() => {
        dispatch(resetSearch());
    }, []);

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={8} sm={10}>
                    <div className={classes.root}>
                        <form className={classes.form} onSubmit={submitHandler}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                autoFocus
                                placeholder='Workout programs..'
                                disabled={loading}
                                onChange={(e) => setSearchInput(e.target.value)}
                                >
                                <SearchIconOutlined />
                            </TextField>
                        </form>
                    </div>
                </Grid>
                <Grid item>
                    <Box>
                        <Grid container justifyContent="center"> 
                            {searchResults && searchResults.map(result => (
                                <Grid container key={result.id} item xs={10} md={6} lg={4} justifyContent="center">
                                    <Link to={{
                                        pathname:`/blog/${result.id}`,
                                        state: {result}
                                    }}>
                                    <Card variant="outlined" className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                src={result.url} 
                                            />
                                            <Box textAlign="center">
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">{result.name}</Typography>
                                                    <Typography gutterBottom variant="body2" component="p" colo="textSecondary">{result.desc}</Typography>
                                                    <Typography variant="body2" component="p" colo="textSecondary">By: {result.displayName}</Typography>
                                                    <Typography variant="body2" component="p" colo="textSecondary">{result.dateCreated}</Typography>
                                                </CardContent>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={6}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default Search;