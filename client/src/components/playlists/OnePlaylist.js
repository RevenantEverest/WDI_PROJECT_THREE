import React, { Component } from 'react';
import services from '../../services/apiServices';
import TokenService from '../../services/TokenService'
import { Redirect } from 'react-router-dom';


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
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
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
    })
    .catch( err => {
      console.log(err);
    })
  }

  handleDeleteSubmit(e) {
    e.preventDefault();
    const data = {
      playlist_id: this.state.apiDataPlaylistName.playlist_id
    }
    services.deletePlaylist(data)
      .then(result => {
        this.setState({
          fireRedirect: true
        })
      })
      .catch(err => {
        console.log(`Couldn't Delete Playlist`, err);
      })
  }

  renderPlaylist(){
    const data = this.state.apiDataSongs;
    if(Array.isArray(data)) {
      return this.state.apiDataSongs.map((song, id) => {
        return(
          <div className="one-playlist-song-container-if-array">
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

  handleEditState() {
    let editButton = document.querySelector('.edit-playlist');
    let deleteButton = document.querySelector('.delete-song');
    let editPlaylistForm = document.querySelector('.playlistName-onePlaylist');
    if(!this.state.editState) {
      this.setState({
        editState: true
      })
      editButton.style.backgroundColor = "black";
      editButton.style.color = "#B2006E";
      deleteButton.style.display = "inline-block";
      editPlaylistForm.style.display = "none";
      this.renderPlaylist();
      this.renderEditPlaylistForm();
    }else {
      this.setState({
        editState: false
      });
      editButton.style.backgroundColor = "inherit";
      editButton.style.color = "inherit";
      deleteButton.style.display = "none";
      editPlaylistForm.style.display = "inline-block";
      this.renderPlaylist();
    }
  }

  render(){
    return(
      <div>
        {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderPlaylistName() : <p>Loading Playlist Name</p>}
        {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderPlaylist() : <p>Loading.....</p>}
        {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderPlaylistDeleteForm() : <p>Loading Delete Form</p>}
        {this.state.fireRedirect ? <Redirect to="/songs"/> : ''}
        {/* <button className="edit-playlist" onClick={(e) => this.handleEditState()}>Edit</button> */}
      </div>
    )
  }
}

export default OnePlaylist;
