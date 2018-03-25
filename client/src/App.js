import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import TokenService from './services/TokenService';
import UserHome from './components/UserHome';
import UserProfile from './components/users/UserProfile';
import SearchBar from './components/songs/SearchBar';
import AddSong from './components/songs/AddSong';
import AllSongs from './components/songs/AllSongs';
import OneSong from './components/songs/OneSong';
import OnePlaylist from './components/playlists/OnePlaylist';
import EditPlaylist from './components/playlists/EditPlaylist';
import AddPlaylist from './components/playlists/AddPlaylist';
import OnePublicProfile from './components/users/OnePublicProfile';
import HomePage from './components/HomePage';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      fireRedirect: false,
      homePageRedirect: false
    }
  }

  handleLogout() {
    TokenService.destroy();
    window.localStorage.clear();
    window.location.reload();
  }

  handleLoginRedirect() {
    this.setState({
      fireRedirect: true
    })
  }

  handleHomePageRedirect() {
    this.setState({
      homePageRedirect: true
    })
  }

  openModal() {
     let modal = document.querySelector('.simpleModal');
     modal.style.display = "block";
     this.setState({
       modalOpen: true
     })
   }

   closeModal() {
     console.log('Hello I Should Be Closing')
     let modal = document.querySelector('.simpleModal');
     modal.style.display = "none";
     this.setState({
       modalOpen: false
     })
   }

  loginButton() {
    return <button className="login" onClick={(e) => this.openModal()}>Login</button>
  }

  logoutButton() {
    return <button className="logout" onClick={(e) => this.handleLogout()}>Logout</button>
  }

  showUsername() {
    return <h2 className="navBar-username">{window.localStorage.username}</h2>
  }

  render(){
    return (
      <div className="BeatBox_Main">
        <Router>
          <div>
            <nav>
              <div className="navBarLogo" onClick={(e) => this.handleHomePageRedirect()}>
              </div>
              <div className="navBarContent">
                <Link to='/home'>Home</Link>
                <Link to='/songs'>Show all Songs</Link>
                <Link to='/search'>Search For Songs</Link>
              </div>
              <div className="login-logout-buttons">
                {this.state.homePageRedirect ? <Redirect to="/" /> : ''}
                {window.localStorage.length > 0 ? this.logoutButton() : this.loginButton()}
                {window.localStorage.length > 0 ? this.showUsername() : ''}
              </div>
            </nav>
            <div className="BeatBox_Main-routes">
              <Route exact path='/' component={HomePage} />
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
              {/*this.state.fireRedirect ? <Redirect to='/login' /> : ''*/}
            </div>
            <div className="simpleModal">
              <div className="modalContent">
                <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
                <h1 className="modalHeading">LOGIN:</h1>
                <UserHome />
                <p className="BeatBox_Main-register-option-p-tag">Or you can sign up <a className="BeatBox_Main-register-option-link" href="/register">here</a></p>
              </div>
            </div>
            <footer>
              <h1 className="footer-h1">Copyright 2018</h1>
              <div className="social-media-containers">
                <div className="facebook">
                </div>
                <div className="twitter">
                </div>
                <div className="github">
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
