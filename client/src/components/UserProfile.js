import React, { Component } from 'react';
// import axios from 'axios';
import services from '../services/apiServices';
import Playlist from './playlists/Playlist';
import AddPlaylist from './playlists/AddPlaylist'

class ComponentOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }
  componentDidMount(){
    console.log('ComponentOne => ' + this.state.userData);
    services.getUserInfo(this.props.userData.username, this.props.userData.user_id)
    .then(result => {
      console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    this.setState({
      userData: this.props.userData,
    })
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
      {this.state.apiDataRecieved ? this.renderUserHomepage() : 'OOPS!!!!'}
      </div>
    )
  }
}

export default ComponentOne;
