import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Box, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {BlogContext} from '../context/BlogContext';

const SideDrawer = ({display, currentUser, logout}) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const {statusHandler, status} = useContext(BlogContext)

    const drawerToggler = () => {
        setOpenDrawer(true)
    }
    
    const useStyles = makeStyles((theme) => ({
        title: {
          flexGrow: 1,
          ...theme.typography.title,
          color: 'black'
        },
        active: {
            fontWeight: 'bold'
        },
    }));

    const classes = useStyles();

    return (
        <>
            <Drawer 
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <Box mt={4}>
                        <ListItem button>
                            <ListItemText><Link to="/"><Typography variant="h5" className={classes.title}>Story</Typography></Link></ListItemText>
                        </ListItem>
                    </Box>
                    <Divider/>
                    {currentUser ? <ListItem button>
                        <ListItemText>Welcome, {display}!</ListItemText>
                        <Divider/>
                    </ListItem> : null}
                    <ListItem button>
                        <ListItemText><Link to="/">Home</Link></ListItemText>
                    </ListItem>
                    {!currentUser ? <ListItem button>
                        <ListItemText><Link to="/login">Login</Link></ListItemText>
                    </ListItem> : null}
                    {currentUser ? <ListItem button>
                        <ListItemText onClick={logout}>Logout</ListItemText>
                    </ListItem> : null}
                    <ListItem button>
                        <ListItemText><Link to="/create">Create</Link></ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={() => {statusHandler("all")}}>
                        <ListItemText><p className={`${status === "all" ? `${classes.active}` : ""}`}>All</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Travel")}}>
                        <ListItemText><p className={`${status === "Travel" ? `${classes.active}` : ""}`}>Travel</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Health")}}>
                        <ListItemText><p className={`${status === "Health" ? `${classes.active}` : ""}`}>Health</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Lifestyle")}}>
                        <ListItemText><p className={`${status === "Lifestyle" ? `${classes.active}` : ""}`}>Lifestyle</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Food")}}>
                        <ListItemText><p className={`${status === "Food" ? `${classes.active}` : ""}`}>Food</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Sports")}}>
                        <ListItemText><p className={`${status === "Sports" ? `${classes.active}` : ""}`}>Sports</p></ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {statusHandler("Self-Improvement")}}>
                        <ListItemText><p className={`${status === "Self-Improvement" ? `${classes.active}` : ""}`}>Self-Improvement</p></ListItemText>
                    </ListItem>
                </List>  
            </Drawer>
            <MenuIcon onClick={drawerToggler}/>
        </>
    )
}

export default SideDrawer
