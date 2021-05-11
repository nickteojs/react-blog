import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
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
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <h3 className="navbar-title"><a href="/">Title</a></h3>
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
            </AppBar>
            
        </div>
    )
}

export default Navigation
