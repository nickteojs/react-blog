import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import {AppBar, Toolbar, Typography, Button, Container, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from '../firebase'

const ref = firebase.firestore().collection("users");

const Navigation = () => {
    const history = useHistory();
    const {currentUser, logoutHandler} = useAuth()
    const [display, setDisplay] = useState()
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
    

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        navbar: {
            background: 'transparent',
            boxShadow: 'none'
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
          ...theme.typography.title,
          color: 'primary'
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

    return (
        <div className={classes.root}>
            <AppBar className={classes.navbar} position="absolute">
                <Container>
                <Toolbar className={classes.override}>
                <Typography variant="h4" color="primary" className={classes.title}>
                    Story
                </Typography>
                <div className="nav-items">
                    <Link to ="/"><Button className={classes.navItem} color="inherit">Home</Button></Link>
                    <Link to ="/blogs"><Button className={classes.navItem} color="inherit">Blogs</Button></Link>
                    {!currentUser && <Link to ="/login"><Button className={classes.navItem} color="inherit">Login</Button></Link>}
                    {currentUser && 
                       <Button className={classes.navItem} onClick={eventHandler}>Logout</Button>
                    }
                    {currentUser && 
                        <Link to ="/create"><Button className={classes.navItem}>Create</Button></Link>
                    }
                    {currentUser &&
                    <Box mx={2}>
                        <Typography variant="body2">
                        Welcome, {display}!
                      </Typography>
                    </Box> 
                    }
                </div>
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Navigation
