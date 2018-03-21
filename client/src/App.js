import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import TokenService from './services/TokenService';
import UserHome from './components/UserHome';
import Login from './components/auth/Login';
// import Home from './components/auth/Home';
import Register from './components/auth/Register';
import UserProfile from './components/users/UserProfile';
// import TestComponent from './TestComponents'
import AllSongs from './components/songs/AllSongs';
import OneSong from './components/songs/OneSong';
import OnePlaylist from './components/playlists/OnePlaylist';
import services from './services/apiServices';

// We dont necessarily need all of these states for this App.js, we should revisit all pages towards the end of the project and see if we need states/state scrub
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      fireRedirect: false
    }
  }

  // does this work??? if not, lets get that going

  handleLogout() {
    window.localStorage.clear();
    this.setState({
      fireRedirect: true
    });
    window.location.reload();
  }

  render(){
    return (
      <div>
        <Router>
          <div>
            <nav>
              {/* not sure if this is working, may have to revisit */}

              {window.localStorage.username  ? <button className="logoutButton" onClick={(e) => this.handleLogout()}>Logout</button> : <button className="loginButton">Log In</button>}

              <Link to='/home'>Home</Link>
              <Link to='/songs'>Show all Songs</Link>
              {/* <Link to='/whatever'>Link to whatever is necessary</Link> */}
            </nav>
            <div>
              <Route exact path='/' component={UserHome} />
              <Route exact path='/login' component={UserHome} />
              <Route exact path='/register' component={UserHome} />
              <Route exact path='/home' component={UserProfile} />
              <Route exaxt path='/songs' component={AllSongs} />
              <Route path='/playlist/:id' component={OnePlaylist} />

              {/* This does not need to be here!  */}
              {this.state.fireRedirect ? <Redirect to='/login' /> : ''}

              {/* Get this route working */}

              { /*<Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
              <Route path='/songs/:id' component={OneSong}/> */}

              {/* Im pretty sure that you are going to need the /add route unless you import it from the user page */}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
