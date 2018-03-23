import React, { Component } from 'react';
import services from '../../services/apiServices';
import {
  BroswerRouter as Router,
  Route,
  Redirect,
  Link
  } from 'react-router-dom';


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
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.removeSong = this.removeSong.bind(this)
  }

  componentDidMount(){
    // console.log('I AM TESTING THIS!!!! ----> ', this.props.match);
    if(this.props.match.path === "/playlist/public/:id"){
      this.setState({
        isThisMine: false
      })
    }
    services.getOnePlaylist(parseInt(this.props.match.params.id))
    .then(playlist => {
      // console.log('Here we are in the return from the componentDidMount', playlist);
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

    services.getPlaylistSongs(parseInt(this.props.match.params.id))
    .then(songs => {
      // console.log('here we are in getting the songs', songs);
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
      // console.log(`I deleted the song from the playlist`);
      alert(`Song was deleted from the playlist!`)
      // window.location.reload();
    })
    .catch( err => {
      console.log(err);
    })
  }

  removeSongFromLibrary(data){
    console.log(`HEY I SUCK `, data);

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
      // console.log(`working with an array of songs ------> `, data);
      return this.state.apiDataSongs.map((song, id) => {
        // console.log(song);
        return(
          <div>
            {/* <button className="delete-song">
              <p className="delete-song-x" onClick={(e) => this.handleDelete()}>&times;</p>
            </button> */}
            <a className="songListing">{song.title}</a>
            {this.state.isThisMine ? <button onClick={() => this.removeSong(song)}>Delete</button> : ""}
          </div>
        )
      })
    } else {
      return(
        <div>
          <h1>
            <button className="delete-song">
              <p className="delete-song-x">&times;</p>
            </button>
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
  renderPlaylistDeleteForm() {
    return(
      <div className="deletePlaylistFormContainer">
        <form className="deletePlaylistForm" onSubmit={this.handleDeleteSubmit}>
          <input type="submit" value="Delete Playlist" />
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
        {this.state.apiDataRecieved ? this.renderPlaylistName() : <p>Loading Playlist Name</p>}
        {this.state.apiDataRecieved ? this.renderPlaylist() : <p>Loading.....</p>}
        {this.state.apiDataRecieved ? this.renderPlaylistDeleteForm() : <p>Loading Delete Form</p>}
        {this.state.fireRedirect ? <Redirect to="/songs"/> : ''}
        {/* <button className="edit-playlist" onClick={(e) => this.handleEditState()}>Edit</button> */}
      </div>
    )
  }
}

export default OnePlaylist;
