import React, { Component } from 'react';
import services from '../../services/apiServices';


class OnePlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null,
      apiDataPlaylist: null,
      editState: false
    }
  }
  componentDidMount(){
    services.getPlaylistInfo(this.props.match.params.id)
    .then(result => {
      console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data,
        apiDataPlaylist: result.data
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })
  }

  renderPlaylist(){
    console.log(this.state.apiData)
    return this.state.apiData.map((song, id) => {
      return(
        <div>
          <h1>
            <button className="delete-song">
              <p className="delete-song-x">&times;</p>
            </button>
            <p2 className="songListing">{song.title}</p2>
          </h1>
        </div>
      )
    })
  }

  renderPlaylistName() {
    return(
      <h1>{this.state.apiDataPlaylist.playlistName}</h1>
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
