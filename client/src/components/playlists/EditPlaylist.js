import React, { Component } from 'react';
import services from '../../services/apiServices';


class EditPlaylist extends Component {
    constructor(props){
      super(props);
    }
    this.state={
      user_id: parseInt(window.localStorage.user_id),
      playlist_name: this.props.playlist_name,
      playlist_id: this.props.playlist_id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
}

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleEditSubmit(e){
    e.preventDefault();
    console.log('Working on edit playlist in its own component ----> ', this.state);
    const data = {
      // username: this.state.userData.username,
      user_id: this.state.user_id,
      playlist_name: this.state.playlist_name,
      playlist_id: this.state.playlist_id
    }
    services.editPlaylistName(data)
    .then(result => {
      console.log(`Editing Playlist ----> `, result);
    })
    .catch(error => {
      console.log(error);
    })

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

  }
