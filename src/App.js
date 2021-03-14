import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import Navigation from './components/Navigation'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  );
}

export default App;
