import React, { Component } from 'react';
import services from '../../services/apiServices';
import {Link} from 'react-router-dom';


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
  }
  componentDidMount(){
    services.getOnePlaylist(parseInt(this.props.match.params.id))
    .then(playlist => {
      this.setState({
        apiDataRecieved: true,
        apiDataPlaylistName: playlist.data.data,
        apiDataPlaylist: playlist.data
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })

    services.getPlaylistSongs(parseInt(this.props.match.params.id))
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

  handleDelete() {

  }

  renderPlaylist(){
    const data = this.state.apiDataSongs;
    if(Array.isArray(data)) {
      return this.state.apiDataSongs.map((song, id) => {
        return(
          <div>
            <h1>
              <button className="delete-song">
                <p className="delete-song-x" onClcik={(e) => this.handleDelete()}>&times;</p>
              </button>
              <a className="songListing">{song.title}</a>
            </h1>
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
      <h1>{this.state.apiDataPlaylistName.playlist_name}</h1>
    )
  }

  handleEditState() {
    let editButton = document.querySelector('.edit-playlist');
    let deleteButton = document.querySelector('.delete-song');
    if(!this.state.editState) {
      this.setState({
        editState: true
      })
      editButton.style.backgroundColor = "black";
      editButton.style.color = "#B2006E";
      deleteButton.style.display = "inline-block";
      this.renderPlaylist();
    }else {
      this.setState({
        editState: false
      });
      editButton.style.backgroundColor = "inherit";
      editButton.style.color = "inherit";
      deleteButton.style.display = "none";
      this.renderPlaylist();
    }
  }

  render(){
    return(
      <div>
        {this.state.apiDataRecieved ? this.renderPlaylistName() : <p>Loading Playlist Name</p>}
        {this.state.apiDataRecieved ? this.renderPlaylist() : <p>Loading.....</p>}
        <button className="edit-playlist" onClick={(e) => this.handleEditState()}>Edit</button>
      </div>
    )
  }
}

export default OnePlaylist;
