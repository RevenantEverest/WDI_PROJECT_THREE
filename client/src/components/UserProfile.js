import React, { Component } from 'react';
// import axios from 'axios';
import services from '../services/apiServices';
import Playlist from './playlists/Playlist';
import AddPlaylist from './playlists/AddPlaylist';
import axios from 'axios';
import TokenService from '../services/TokenService';

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
    console.log(`im here`);
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log(`im the onload window response!! ---> `, resp)
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        apiDataRecieved: true
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        fireRedirect: true
      })
    })
  }

  getUserInfo(){
    console.log('ComponentOne ---> ', this.state.userData);
    services.getUserInfo(this.state.userData.username, this.state.userData.user_id)
    .then(result => {
      console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    // this.setState({
    //   userData: this.props.userData,
    // })
  }
  renderUserHomepage(){
    const allPlayLists = this.state.apiData.map((playlist, id) => <Playlist playlist={playlist} key={id} />)
    return(
      <div className="userHomePageTrue">
        <h1>Welcome back {this.state.userData.username}!</h1>
        {allPlayLists}
        <AddPlaylist userData={this.state.userData} />
      </div>
    )
  }
  render() {
    return(
      <div className="userHomePageFalse">
      {this.state.apiDataRecieved ? this.renderUserHomepage() : 'Loading!!!!'}
      {this.state.fireRedirect}
      </div>
    )
  }
}

export default UserProfile;
