import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Box, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { filterBlogs } from '../features/blogs/blogsSlice';
import { logout } from '../features/auth/authSlice';

const SideDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { filterStatus, statuses } = useSelector(state => state.blogsSlice);
    const { user: currentUser,  userInfo } = useSelector(state => state.authSlice);

    const drawerToggler = () => {
        setOpenDrawer(true);
    }
    
    const useStyles = makeStyles((theme) => ({
        title: {
          flexGrow: 1,
          color: 'black',
          fontFamily: 'Pattaya'
        },
        active: {
            fontWeight: 'bold'
        },
        drawer: {
            width: 200
        }
    }));

    const classes = useStyles();

    const clickHandler = statusType => {
        dispatch(filterBlogs({
            category: statusType,
            type: "navigate"
        }))
        setOpenDrawer(false);
    }

    const FilterRows = () => {
        return statuses.map(statusType => (
            <Link to={statusType === "All" ? '/blogs/all/1' : `/blogs/category/${statusType}/1`} key={statusType}>
                <ListItem
                    button
                    onClick={() => clickHandler(statusType)}>
                    <ListItemText>
                        <p className={`${filterStatus === statusType ? `${classes.active}` : ""}`}>
                            {statusType}
                        </p>
                    </ListItemText>
                </ListItem>
            </Link>
        ))
    }

    return (
        <>
            <Drawer 
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            >
                <List className={classes.drawer}>
                    <Box mt={4}>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText><Link to="/"><Typography variant="h5" className={classes.title}>Story</Typography></Link></ListItemText>
                        </ListItem>
                    </Box>
                    <Divider/>
                    {currentUser !== null && <ListItem button>
                        <ListItemText>Welcome, {userInfo.displayName}!</ListItemText>
                        <Divider/>
                    </ListItem>}
                    {currentUser === null && <Link to="/login"><ListItem button onClick={() => setOpenDrawer(false)}>
                        <ListItemText>Login</ListItemText>
                    </ListItem></Link>}
                    {currentUser !== null && <ListItem button>
                        <ListItemText onClick={() => dispatch(logout())}>Logout</ListItemText>
                    </ListItem>}
                    <Link to="/create">
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText>Create</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/search">
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText>Search</ListItemText>
                        </ListItem>
                    </Link>
                </List>
                <Divider/>
                {location.pathname === "/" || location.pathname.includes("blogs") ? <List>
                    <FilterRows />
                </List>: null}  
            </Drawer>
            <MenuIcon onClick={drawerToggler}/>
        </>
    )
}

export default SideDrawer;
