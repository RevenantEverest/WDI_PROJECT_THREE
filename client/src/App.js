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
import Register from './components/auth/Register';
import UserProfile from './components/users/UserProfile';
import SearchBar from './components/songs/SearchBar';
import AddSong from './components/songs/AddSong';
import AllSongs from './components/songs/AllSongs';
import OneSong from './components/songs/OneSong';
import OnePlaylist from './components/playlists/OnePlaylist';
import EditPlaylist from './components/playlists/EditPlaylist';
import AddPlaylist from './components/playlists/AddPlaylist';
import OnePublicProfile from './components/users/OnePublicProfile';
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

  handleLogout() {
    window.localStorage.clear();
    this.setState({
      fireRedirect: true
    });
    window.location.reload();
  }

  render(){
    return (
      <div className="BeatBox_Main">
        <Router>
          <div>
            <nav>
              <Link to='/home'>Home</Link>
              <Link to='/songs'>Show all Songs</Link>
              <Link to='/search'>Search For Songs</Link>
            </nav>
            <div className="BeatBox_Main-routes">
              <Route exact path='/' component={UserHome} />
              <Route exact path='/login' component={UserHome} />
              <Route exact path='/register' component={UserHome} />
              <Route exact path='/home' component={UserProfile} />
              <Route exact path='/songs' component={AllSongs} />
              <Route exact path='/search' component={SearchBar} />
              <Route path='/songs/:id' component={OneSong}/>
              <Route exact path='/public/:id' component={OnePublicProfile} />
              <Route exact path='/addsong/:id' component={AddSong} />
              <Route exact path='/addPlaylist' component={AddPlaylist} />
              <Route exact path='/playlist/:id' component={OnePlaylist} />
              <Route exact path='/playlist/edit/:id' component={EditPlaylist} />
              <Route exact path='/playlist/public/:id' component={OnePlaylist} />
              {this.state.fireRedirect ? <Redirect to='/login' /> : ''}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
