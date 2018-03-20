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
// import UserProfile from './components/UserProfile';
import TestComponent from './TestComponents'
import AllSongs from './components/songs/AllSongs';
import OneSong from './components/songs/OneSong';
import OnePlaylist from './components/playlists/OnePlaylist';
import services from './services/apiServices';


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
  render(){
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={UserHome} />
            <Route exact path='/login' component={UserHome} />
            <Route exact path='/register' component={UserHome} />
            <Route exact path='/home' component={TestComponent} />
            <Route exaxt path='/songs' component={AllSongs} />
            {/* <Route path='/playlist/:id' component={OnePlaylist} />
            <Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
            <Route path='/songs/:id' component={OneSong}/> */}
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
