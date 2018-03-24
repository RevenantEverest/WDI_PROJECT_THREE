import React, { Component } from 'react';
import services from '../../services/apiServices';
import { Link } from 'react-router-dom'


class OnePublicProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.match.params.username,
      user_id: this.props.match.params.id
    }
    this.getAllPlaylists = this.getAllPlaylists.bind(this);
    this.renderAllPlaylists = this.renderAllPlaylists.bind(this);
  }

  componentDidMount(){
    //make a services call to the db to get all playlist names and all songs in the playlist
    this.getAllPlaylists()

  }
  getAllPlaylists(){
    services.getUserInfo(this.state.username, this.state.user_id)
    .then(result => {
      this.setState({
        onePublicProfilePlaylists: result.data.data,
        apiDataRecieved: true
      })
    })
    .catch(err => {
      console.log(`you spoke too soon ---> `, err);
    })
  }
  renderAllPlaylists(){
    const allPlayLists = this.state.onePublicProfilePlaylists.map((playlist, id) => <Link to={`/playlist/public/${playlist.playlist_id}`}>{playlist.playlist_name}</Link> )
    return(
        <div>
          {allPlayLists}
        </div>
    )
  }
  render(){
  // console.log(`This is the error handler!!!!!!!! ------> `, this.props.match.params);
  const dontShow = this.props.match.params.username
    return(
      <div>
      {this.state.apiDataRecieved && dontShow !== "addsong" ? this.renderAllPlaylists() : ''}
      </div>
    )
  }
}

export default OnePublicProfile;
