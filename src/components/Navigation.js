import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {AppBar, Toolbar, Typography, Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Navigation = () => {
    const history = useHistory();
    const {currentUser, logoutHandler} = useAuth()
    const eventHandler = () => {
        logoutHandler(history);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
          ...theme.typography.title
        },

    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                <Toolbar>
                <Typography variant="h4" className={classes.title}>
                    Story
                </Typography>
                <div className="nav-items">
                    <Button color="inherit" ><Link to ="/">Home</Link></Button>
                    <Button color="inherit" ><Link to ="/blogs">Blogs</Link></Button>
                    {!currentUser && <ul><li><Button color="inherit"><Link to ="/login">Login</Link></Button></li></ul>}
                    {currentUser && 
                       <Button onClick={eventHandler}>Logout</Button>
                    }
                    {currentUser && 
                        <Button><Link to ="/create">Add Blog</Link></Button>
                    }
                    {currentUser && 
                        <Typography variant="h6" className={classes.title}>
                        Logged in as {currentUser.email}
                      </Typography>
                    }
                </div>
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Navigation
