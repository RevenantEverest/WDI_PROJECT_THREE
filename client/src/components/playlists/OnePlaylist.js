import React, { Component } from 'react';
import services from '../../services/apiServices';
import TokenService from '../../services/TokenService';


class OnePlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiDataPlaylistName: null,
      apiDataPlaylist: null,
      apiDataSongs: null,
      editState: false,
      isThisMine: true,
      isLoggedIn: false
    }
    this.removeSong = this.removeSong.bind(this)
    this.checkPlaylist = this.checkPlaylist.bind(this)
  }
  componentDidMount(){
    services.checkLoggedIn(TokenService.read())
    .then(result => {
      this.setState({
        isLoggedIn: result.data.isLoggedIn
      }, this.checkPlaylist())

    })
  }

  checkPlaylist(){
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
      this.removeSongFromLibrary(result)
      alert(`Song was deleted from the playlist!`)
      this.setState({
        fireRedirect: true
      })
    })
    .catch( err => {
      console.log(err);
      window.location.reload();
    })
  }

  renderPlaylist(){
    const data = this.state.apiDataSongs;
    if(Array.isArray(data)) {
      return this.state.apiDataSongs.map((song, id) => {
        return(
          <div className="one-playlist-song-container-if-array" key={id}>
            <a className="one-playlist-song-listing one-playlist-song-listing-if-array">{song.title}</a>
            {this.state.isThisMine ? <button className="one-playlist-remove-song-button" onClick={() => this.removeSong(song)}>Delete</button> : ""}
          </div>
        )
      })
    } else {
      return(
        <div className="one-playlist-song-container-if-object">
          <h1>
            <a className="one-playlist-song-listing one-playlist-song-listing-if-object">{data}</a>
          </h1>
        </div>
      )
    }
  }

  renderPlaylistName() {
    return(
      <h1 className="one-playlist-playlist_name">{this.state.apiDataPlaylistName.playlist_name}</h1>
    )
  }
  renderPlaylistDeleteForm() {
    return(
      <div className="one-playlist-delete-playlist-form-container">
        <form className="one-playlist-delete-playlist-form" onSubmit={this.handleDeleteSubmit}>
          <input className="one-playlist-input-submit" type="submit" value="Delete Playlist" />
        </form>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderPlaylistName() : <p>Loading Playlist Name</p>}
        {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderPlaylist() : <p>Loading.....</p>}
        {this.state.fireRedirect ? window.location.reload() : ''}
      </div>
    )
  }
}

export default OnePlaylist;