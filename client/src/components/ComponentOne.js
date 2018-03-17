import React, { Component } from 'react';
// import axios from 'axios';
import services from '../services/apiServices';
import PlayList from './Playlist'

class ComponentOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }
  componentDidMount(){
    // console.log(this.props);
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
    const allPlayLists = this.state.apiData.map((playlist, id) => <PlayList playlist={playlist} key={id} />)
    return(
      <div>
        <h1>Welcome back {this.state.userData.username}!</h1>
        {allPlayLists}
      </div>
    )
  }
  render() {
    return(
      <div>
      {this.state.apiDataRecieved ? this.renderUserHomepage() : 'OOPS!!!!'}
      </div>
    )
  }
}

export default ComponentOne;
