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
      editState: false
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleEditSubmit = this.handleEditSubmit.bind(this);
    // this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.removeSong = this.removeSong.bind(this)
  }

  componentDidMount(){
    console.log(`in one playlist`);
    services.getOnePlaylist(parseInt(this.props.match.params.id))
    .then(playlist => {
      console.log('Here we are in the return from the componentDidMount', playlist);
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
      console.log('here we are in getting the songs', songs);
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
    // console.log(`this is the playlist that I am in ---->`, this.state.apiDataPlaylistName.playlist_id);
    // console.log(`removing song ----> `, song);
    const data = {
      playlist_id: this.state.apiDataPlaylistName.playlist_id,
      song_id: song.song_id
    }
    // console.log(`Here is the data that I am passing to the back end ----> `, data);
    services.removeSongFromPlaylist(data)
    .then(result => {
      console.log(`I deleted the song from the playlist`);
      alert(`Song was deleted from the playlist!`)
      window.location.reload();
    })
    .catch( err => {
      console.log(err);
    })
  }
  //
  // handleChange(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({
  //     [name]: value
  //   })
  // }

  // handleEditSubmit(e){
  //   e.preventDefault();
  //   const data = {
  //     // username: this.state.userData.username,
  //     user_id: parseInt(window.localStorage.user_id),
  //     playlist_name: this.state.playlist_name,
  //     playlist_id: this.state.apiDataPlaylistName.playlist_id
  //   }
  //   services.editPlaylistName(data)
  //   .then(result => {
  //     console.log(`Editing Playlist ----> `, result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }
  //
  // handleDeleteSubmit(e) {
  //   e.preventDefault();
  //   const data = {
  //     playlist_id: this.state.apiDataPlaylistName.playlist_id
  //   }
  //   services.deletePlaylist(data)
  //     .then(result => {
  //       this.setState({
  //         fireRedirect: true
  //       })
  //     })
  //     .catch(err => {
  //       console.log(`Couldn't Delete Playlist`, err);
  //     })
  // }

  renderPlaylist(){
    const data = this.state.apiDataSongs;
    if(Array.isArray(data)) {
      console.log(`working with an array of songs ------> `, data);
      return this.state.apiDataSongs.map((song, id) => {
        console.log(song);
        return(
          <div>
            {/* <button className="delete-song">
              <p className="delete-song-x" onClick={(e) => this.handleDelete()}>&times;</p>
            </button> */}
            <a className="songListing">{song.title}</a>
            <button onClick={() => this.removeSong(song)}>Delete</button>
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

  renderEditPlaylistForm() {
    return(
      <div className="editPlaylistFormContainer">
        <form className="editPlaylistForm" onSubmit={this.handleEditSubmit}>
          <input type="text" name="playlist_name" onChange={this.handleChange} placeholder='Edit Playlist' />
          <input type="submit" value="Update" />
        </form>
      </div>
    );
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
        {/* {this.state.apiDataRecieved ? this.renderEditPlaylistForm() : <p>Loading Edit Form</p>} */}
        {/* {this.state.apiDataRecieved ? this.renderPlaylistDeleteForm() : <p>Loading Delete Form</p>} */}
        {this.state.fireRedirect ? <Redirect to="/songs"/> : ''}
        {/* <button className="edit-playlist" onClick={(e) => this.handleEditState()}>Edit</button> */}
      </div>
    )
  }
}

export default OnePlaylist;
