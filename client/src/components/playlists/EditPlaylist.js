import React, { Component } from 'react';
import services from '../../services/apiServices';
import { Redirect } from 'react-router-dom';


class EditPlaylist extends Component {
    constructor(props){
      super(props);
    this.state={
      user_id: parseInt(window.localStorage.user_id),
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
        <div className="editPlaylistFormContainer">
          <form className="editPlaylistForm" onSubmit={this.handleEditSubmit}>
            <input type="text" name="playlist_name" onChange={this.handleChange} placeholder='Edit Playlist' />
            <input type="submit" value="Update" />
          </form>
          {this.state.fireRedirect ? <Redirect to='/home' /> : ''}
        </div>
      );
    }

  }

  export default EditPlaylist;
