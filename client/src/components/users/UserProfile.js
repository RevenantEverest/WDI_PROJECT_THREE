import React, { Component } from 'react';
import services from '../../services/apiServices';
import Playlist from '../playlists/Playlist';
import AddPlaylist from '../playlists/AddPlaylist';
import EditPlaylist from '../playlists/EditPlaylist';
import PublicProfiles from './PublicProfiles';
import Privacy from './Privacy';
import axios from 'axios';
import TokenService from '../../services/TokenService';

import {Link} from 'react-router-dom';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null,
      fireRedirect: true
    }
    this.getUserInfo = this.getUserInfo.bind(this)
  }

  componentDidMount(){
    services.checkLoggedIn(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        username: window.localStorage.username,
        user_id: parseInt(window.localStorage.user_id)
      })
      this.getUserInfo()
    })
    .catch(err => {
      console.log(err);
      this.setState({
        fireRedirect: true
      })
    })
  }

  getUserInfo(){
    services.getUserInfo(this.state.username, this.state.user_id)
    .then(result => {
      // console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
  }
  renderUserHomepage(){
    // console.log(this.state.apiData);
    const allPlayLists = this.state.apiData.map((playlist, id) => <Playlist playlist={playlist} key={id} />)
    return(
      <div className="userHomePageTrue">
        <h1>Welcome back {this.state.username}!</h1>
        {allPlayLists}
        <button><a href="/addPlaylist">Add Playlist</a></button>
      <br></br>
      <br></br>
      <Privacy/>
      <br></br>
      <br></br>
      <PublicProfiles />
      </div>
    )
  }
  render() {
    return(
      <div className="userHomePageFalse">
      {this.state.apiDataRecieved ? this.renderUserHomepage() : 'Loading!!!!'}
      </div>
    )
  }
}

export default UserProfile;
