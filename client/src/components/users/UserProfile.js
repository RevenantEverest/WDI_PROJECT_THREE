import React, { Component } from 'react';
import services from '../../services/apiServices';
import Playlist from '../playlists/Playlist';
import AddPlaylist from '../playlists/AddPlaylist';
import axios from 'axios';
import TokenService from '../../services/TokenService';

// setting initial state of this component, may not need all of these, we will state scrub at the end when the project is up and working

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

// upon load of this component, check to see if the user is logged in and set the state based on the user information saved in localStorage

  componentDidMount(){
    services.checkLoggedIn(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        username: window.localStorage.username,
        user_id: parseInt(window.localStorage.user_id)
      })
      //call the next funciton inline to retrieve the user specific information
      this.getUserInfo()
    })
    .catch(err => {

      //fireRedirect is not currently being used, just set up to redirect to anywhere we want in that case, as it stands, it will direct to the login/register page if there is nothing saved in window.localStorage.authToken

      console.log(err);
      this.setState({
        fireRedirect: true
      })
    })
  }

  //function to get the user information to display the playlists on the users homepage

  getUserInfo(){
    console.log('ComponentOne ---> ', this.state.userData);
    services.getUserInfo(this.state.username, this.state.user_id)
    .then(result => {
      // console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
  }

  //once api data is loaded, render the page

  renderUserHomepage(){
    // console.log(this.state.apiData);
    const allPlayLists = this.state.apiData.map((playlist, id) => <Playlist playlist={playlist} key={id} />)
    return(
      <div className="userHomePageTrue">
        <h1>Welcome back {this.state.username}!</h1>
        {allPlayLists}

        {/* we no longer need to pass the userData through here, we can acess in localStorage, remove props */}

        <AddPlaylist userData={this.state.userData} />
      </div>
    )
  }

  // The other side of the if tearnary needs to be updated to redirect to an error handler page, consider making this a full blown if statement and changing state with a setTimeout to display loading then firing a redirect to login if the user is not logged in....displaying loading if its waiting on the actual db or if the user is not logged in, redirecting

  render() {
    return(
      <div className="userHomePageFalse">
      {this.state.apiDataRecieved ? this.renderUserHomepage() : 'Loading!!!!'}
      </div>
    )
  }
}

export default UserProfile;
