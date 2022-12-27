import { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './index.css';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import RecentBlogs from './components/RecentBlogs';
import EditBlog from './components/EditBlog';
import Blog from './components/Blog';
import FlashMessage from './components/FlashMessage';
import Search from './components/Search';
import { setCurrentUser, setLoading, setUserData } from './features/auth/authSlice';
import useAuth from './authUpdater';

const App =() => {
  const authUser = useAuth();
  const dispatch = useDispatch();

  // Auth Change Listener
  useEffect(() => {
    if (Object.keys(authUser).includes("uid")) {
      dispatch(setCurrentUser(authUser.uid));
      dispatch(setUserData(authUser));
      dispatch(setLoading());
    } else {
      dispatch(setLoading());
    }
  }, [authUser]);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/" exact component={RecentBlogs}/>
          <Route path="/create" exact component={CreateBlog}/>
          <Route path="/blogs/all/:pageNumber" exact render={props => (<Blogs {...props} />)}/>
          <Route path="/blogs/category/:category/:pageNumber" exact render={props => (<Blogs {...props} />)}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/blog/:id" exact render={props => (<Blog {...props} />)}/>
          <Route path="/blog/:id/edit" exact component={EditBlog} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
        <FlashMessage />
      </div>
    </Router>
  );
}

export default App;
