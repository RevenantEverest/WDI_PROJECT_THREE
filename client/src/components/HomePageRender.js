import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import UserProfile from './UserProfile';
import AllSongs from './songs/AllSongs';
import OneSong from './songs/OneSong';
import OnePlaylist from './playlists/OnePlaylist';

class HomePageRender extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <Router>
          <div>
            <div className="navBar">
              <div className="searchBarContainer">
                <input className="searchBar" type="text" name="search" placeholder="Search" />
              </div>
              <nav>
                <div className="navBarContent">
                  <Link className="navBarHome" to='/home'>Home</Link>
                  <Link className="navBarSongs" to='/songs'>Songs</Link>
                </div>
                <button className="logoutButton" onClick={this.loggingOut}>Log Out</button>
              </nav>
            </div>
            <Route exact path='/home' component={UserProfile} />
            <Route path='/playlist/:id' component={OnePlaylist} />
            <Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
            <Route path='/songs/:id' component={OneSong}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default HomePageRender;
