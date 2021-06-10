import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import {AppBar, Toolbar, Typography, Button, Container, Box, useTheme, useMediaQuery, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SideDrawer from './SideDrawer'
import firebase from '../firebase'

const Navigation = () => {
    const history = useHistory();
    const {currentUser, logoutHandler} = useAuth()
    const [display, setDisplay] = useState()
    const ref = firebase.firestore().collection("users");
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
    
    const useStyles = makeStyles((theme) => ({
        navbar: {
            background: '#F5F5F5',
            boxShadow: 'none',
            color: 'black',
        },
        title: {
          flexGrow: 1,
          ...theme.typography.title,
          color: 'black'
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
        logoutHandler(history);
    }

    useEffect(() => {
        if (currentUser) {
            ref.doc(currentUser.uid).get().then(doc => {
                setDisplay(doc.data().displayName)
            })
        }
    }, [currentUser])

    return (
        <Box mt={isSmall ? 4 : 7}>
            <AppBar className={classes.navbar} position="static">
                <Grid container justify="center">
                    <Grid item xs={11} sm={10} lg={12}>
                        <Container>
                            <Box borderBottom={4}>
                                <Toolbar className={classes.override}>
                                    <Typography gutterBottom variant="h3" color="primary" className={classes.title}>
                                        <Link to="/">Story</Link>
                                    </Typography>
                                    {isSmall ? <SideDrawer display={display} currentUser={currentUser} logout={eventHandler}/> : 
                                        <div className="nav-items">
                                            <Link to ="/"><Button className={classes.navItem} color="inherit">Home</Button></Link>
                                            {!currentUser && <Link to ="/login"><Button className={classes.navItem} color="inherit">Login</Button></Link>}
                                            {currentUser && <Button className={classes.navItem} onClick={eventHandler}>Logout</Button>}
                                            <Link to ="/create"><Button className={classes.navItem}>Create</Button></Link>
                                            {currentUser && <Box mx={2}><Typography variant="body2">Welcome, {display}!</Typography></Box>}
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

export default Navigation
