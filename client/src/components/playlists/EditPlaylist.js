import React, { Component } from 'react';
import services from '../../services/apiServices';
import { Redirect } from 'react-router-dom';


class EditPlaylist extends Component {
    constructor(props){
      super(props);
    this.state={
      user_id: parseInt(window.localStorage.user_id, 10),
      // playlist_name: this.props.playlist_name,
      playlist_id: this.props.match.params.id,
      fireRedirect: false
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
    services.editPlaylistName(this.state)
    .then(result => {
      console.log(`Editing Playlist ----> `, result);
      this.setState({
        fireRedirect: true
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

    render() {
      return(
        <div className="edit-playlist-container">
          <form className="edit-playlist-form" onSubmit={this.handleEditSubmit}>
            <input className="edit-playlist-input-playlist_name" type="text" name="playlist_name" onChange={this.handleChange} placeholder='Edit Playlist' />
            <input className="edit-playlist-input-submit" type="submit" value="Update" />
          </form>
          {this.state.fireRedirect ? <Redirect to='/home' /> : ''}
        </div>
      );
    }

  }

  export default EditPlaylist;
