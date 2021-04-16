import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './index.css';
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import CreateBlog from './components/CreateBlog'
import Blogs from './components/Blogs'
import RecentBlogs from './components/RecentBlogs'
import EditBlog from './components/EditBlog'
import { BlogProvider } from './context/BlogContext'
import PrivateRoute from './components/PrivateRoute'
import firebase from './firebase'
import { BlogContext } from './context/BlogContext'
import {useContext} from 'react'
import {AuthProvider} from './context/AuthContext'



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

  const editBlog = (updatedBlog) => {
    ref
      .doc(updatedBlog.id)
      .update(updatedBlog)
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
                <Route path="/blogs" exact render={props => (<Blogs {...props} removeBlog={removeBlog}/>)}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path={["/blogs/:id", "/blogs/:id/edit"]} exact render={({match}) => (
                  <EditBlog blog={blogs.find(b => b.id === match.params.id)} editBlog={editBlog}/>
                )}/>
              </Switch>
            </div>
          </Router>
        </AuthProvider>
  );
}

export default App;
