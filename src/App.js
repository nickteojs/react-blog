import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import Navigation from './components/Navigation'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Blogs from './components/Blogs'
import { BlogProvider } from './context/BlogContext'

function App() {
  return (
    <BlogProvider>
        <Router>
          <div className="App">
            <Navigation />
            <Blogs />
            <CreateBlog />
            <Route path="/login" component={Login}/>
          </div>
        </Router>
    </BlogProvider>
  );
}

export default App;
