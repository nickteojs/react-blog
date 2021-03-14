import {Link} from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <h3 className="navbar-title"><a href="/">React Blog</a></h3>
            <div className="nav-items">
                <ul><li><Link to ="/">Home</Link></li></ul>
                <ul><li><Link to ="/login">Login</Link></li></ul>
            </div>
        </nav>
    )
}

export default Navigation
