import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import SingleList from './components/SingleList';
import Search from './components/Search';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <Link to='/Login'>Home</Link>
              <Link to='/Signup'>Sign Up</Link>
              <Link to='/Search'>Search Music</Link>
            </nav>
              <Route exact path='/' component={Login} />
              <Route path='/Signup' component={Signup} />
              <Route path='/Search' component={Search} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
