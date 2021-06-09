import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './index.css';
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import CreateBlog from './components/CreateBlog'
import Blogs from './components/Blogs'
import RecentBlogs from './components/RecentBlogs'
import EditBlog from './components/EditBlog'
import PrivateRoute from './components/PrivateRoute'
import { BlogContext } from './context/BlogContext'
import {useContext} from 'react'
import Blog from './components/Blog';
import FlashMessage from './components/FlashMessage'
import {useAuth} from './context/AuthContext'

const App =() => {
  const {blogs} = useContext(BlogContext);
  const { success } = useAuth()

  return (
          <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route path="/" exact component={RecentBlogs}/>
                <PrivateRoute path="/create" exact render={props => (<CreateBlog {...props} />)}/>
                <Route path="/blogs" exact render={props => (<Blogs {...props} />)}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/blogs/:id" exact render={props => (<Blog {...props} />)}/>
                <PrivateRoute path={["/blogs/:id/edit"]} exact render={({match}) => (
                  <EditBlog blog={blogs.find(b => b.id === match.params.id)} />
                )}/>
                <Route render={() => <Redirect to="/" />} />
              </Switch>
              {success ? <FlashMessage message={success} success={success}/> : null}
            </div>
          </Router>
  );
}

export default App;
