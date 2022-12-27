import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Container, Box, useTheme, useMediaQuery, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navigation = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

    const { user: currentUser, userInfo, loading } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    
    const useStyles = makeStyles((theme) => ({
        navbar: {
            background: '#F5F5F5',
            boxShadow: 'none',
            color: 'black',
        },
        title: {
          flexGrow: 1,
          color: 'black',
          fontFamily: 'Pattaya'
        },
        navItem: {
            color: 'black',
            textTransform: 'none',
            fontWeight: 'bold'
        },
        override: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }));

    const classes = useStyles();

    const eventHandler = () => {
        dispatch(logout());
    }

    return (
        <Box mt={isSmall ? 4 : 7}>
            <AppBar className={classes.navbar} position="static">
                <Grid container justifyContent="center">
                    <Grid item xs={11} sm={10} lg={12}>
                        <Container>
                            <Box borderBottom={4}>
                                <Toolbar className={classes.override}>
                                    <Typography gutterBottom variant="h3" color="primary" className={classes.title}>
                                        <Link to="/">Story</Link>
                                    </Typography>
                                    {isSmall ? <SideDrawer/> :
                                        loading ? <CircularProgress size={20} /> : 
                                        <div className="nav-items">
                                            <Link to="/search">
                                                <Button className={classes.navItem} color="inherit">
                                                    Search
                                                </Button>
                                            </Link>
                                            {currentUser !== null ? 
                                                <Button className={classes.navItem} onClick={eventHandler}>
                                                    Logout
                                                </Button> : 
                                                <Link to="/login">
                                                    <Button className={classes.navItem} color="inherit">
                                                        Login
                                                    </Button>
                                                </Link>
                                            }
                                            <Link to ="/create">
                                                <Button className={classes.navItem}>
                                                    Create
                                                </Button>
                                            </Link>
                                            <Box ml={1}>
                                                <Typography variant="body2">
                                                    {(Object.keys(userInfo).length !== 0) && `Welcome, ${userInfo.displayName}!`}
                                                </Typography>
                                            </Box>
                                        </div>
                                    }
                                </Toolbar>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </AppBar>
        </Box>
    )
}

export default Navigation;
