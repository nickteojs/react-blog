import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const Navigation = () => {
    const history = useHistory();
    const {currentUser, logoutHandler} = useAuth()

    const eventHandler = () => {
        logoutHandler(history);
    }

    return (
        <nav>
            <h3 className="navbar-title"><a href="/">React Blog</a></h3>
            <div className="nav-items">
                <ul><li><Link to ="/">Home</Link></li></ul>
                {!currentUser && <ul><li><Link to ="/login">Login</Link></li></ul>}
                {currentUser && <ul><li onClick={eventHandler}>Logout</li></ul>}
                <ul><li><Link to ="/blogs">Blogs</Link></li></ul>
                {currentUser && <ul><li><Link to ="/create">Add Blog</Link></li></ul>}
                {currentUser && <ul><li>Logged in as {currentUser.email}</li></ul>}
            </div>
        </nav>
    )
}

export default Navigation
