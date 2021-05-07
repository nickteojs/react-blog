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
import firebase from './firebase'
import { BlogContext } from './context/BlogContext'
import {useContext} from 'react'
import {AuthProvider} from './context/AuthContext'
import Blog from './components/Blog';

const App =() => {
  const ref = firebase.firestore().collection("blogs");
  const [blogs] = useContext(BlogContext);

  const addBlog = (newBlog) => {
    ref
        .doc(newBlog.id)
        .set(newBlog)
        .catch(error => console.log(error));
  }

  const removeBlog = (blog) => {
    ref
      .doc(blog.id)
      .delete()
      .catch(error => console.log(error));
  }

  const editBlog = (editedBlog) => {
    ref
      .doc(editedBlog.id)
      .update(editedBlog)
      .catch(error => console.log(error));
  }

  return (
      <AuthProvider>
          <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route path="/" exact component={RecentBlogs}/>
                <PrivateRoute path="/create" exact render={props => (<CreateBlog {...props} addBlog={addBlog}/>)}/>
                <Route path="/blogs" exact render={props => (<Blogs {...props} />)}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <PrivateRoute path="/blogs/:id" exact render={props => (<Blog {...props} removeBlog={removeBlog}/>)}/>
                <PrivateRoute path={["/blogs/:id/edit"]} exact render={({match}) => (
                  <EditBlog blog={blogs.find(b => b.id === match.params.id)} editBlog={editBlog}/>
                )}/>
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </div>
          </Router>
        </AuthProvider>
  );
}

export default App;
