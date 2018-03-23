import React, { Component } from 'react';
import services from '../../services/apiServices';
import {Redirect} from 'react-router-dom';


class OnePlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiDataPlaylistName: null,
      apiDataPlaylist: null,
      apiDataSongs: null,
      editState: false,
      isThisMine: true
    }
    this.removeSong = this.removeSong.bind(this)
  }

  componentDidMount(){
    if(this.props.match.path === "/playlist/public/:id"){
      this.setState({
        isThisMine: false
      })
    }
    services.getOnePlaylist(parseInt(this.props.match.params.id, 10))
    .then(playlist => {
      this.setState({
        apiDataRecieved: true,
        apiDataPlaylistName: playlist.data.data,
        apiDataPlaylist: playlist.data,
        fireRedirect: false
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })

    services.getPlaylistSongs(parseInt(this.props.match.params.id, 10))
    .then(songs => {
      this.setState({
        apiDataRecieved: true,
        apiDataSongs: songs.data.data
      })
    })
    .catch(error => {
      console.log('You done yourself an error => ', error);
    })
  }

  removeSong(song) {
    const data = {
      playlist_id: this.state.apiDataPlaylistName.playlist_id,
      song_id: song.song_id
    }
    services.removeSongFromPlaylist(data)
    .then(result => {
      alert(`Song was deleted from the playlist!`)
      window.location.reload();
    })
    .catch( err => {
      console.log(err);
    })
  }

  renderPlaylist(){
    const data = this.state.apiDataSongs;
    if(Array.isArray(data)) {
      return this.state.apiDataSongs.map((song, id) => {
        return(
          <div key={id}>
            <a className="songListing">{song.title}</a>
            {this.state.isThisMine ? <button onClick={() => this.removeSong(song)}>Delete</button> : ""}
          </div>
        )
      })
    } else {
      return(
        <div>
          <h1>
            <a className="songListing">{data}</a>
          </h1>
        </div>
      )
    }
  }

  renderPlaylistName() {
    return(
      <h1 className="playlistName-onePlaylist">{this.state.apiDataPlaylistName.playlist_name}</h1>
    )
  }


  render(){
    return(
      <div>
        {this.state.apiDataRecieved ? this.renderPlaylistName() : <p>Loading Playlist Name</p>}
        {this.state.apiDataRecieved ? this.renderPlaylist() : <p>Loading.....</p>}
        {this.state.fireRedirect ? <Redirect to="/songs"/> : ''}
      </div>
    )
  }
}

export default OnePlaylist;
