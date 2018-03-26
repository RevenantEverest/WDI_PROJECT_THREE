import React, { Component } from 'react';
import axios from 'axios';
import TokenService from '../../services/TokenService';
import services from '../../services/apiServices';
import { Redirect } from 'react-router-dom';

class AddSong extends Component {
          constructor(props){
            super(props);
            this.state = {
              song_id: parseInt(this.props.match.params.id, 10),
              user_id: parseInt(window.localStorage.user_id, 10),
              playlists: null,
              fireRedirect: false
            }
            this.renderAddForm = this.renderAddForm.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleChange = this.handleChange.bind(this)
          }
    componentDidMount(){
        axios(`http://localhost:3000/isLoggedIn`, {
            headers: {
                Authorization: `Bearer ${TokenService.read()}`,
              },
            }).then(resp => {
              this.setState({
                isLoggedIn: resp.data.isLoggedIn,
              })
              this.getAllUserPlaylists()
            })
            .catch(err => console.log(err))
            //this is were we will Redirect to the Login page
          }

    getAllUserPlaylists(){
      const username = window.localStorage.username;
      const user_id = parseInt(window.localStorage.user_id, 10)
      services.getUserInfo(username, user_id)
      .then(result => {
        this.setState({
          playlists: result.data.data
        })
      })
      .catch(err => {
        console.log(err);
      })

    }
    handleChange(e){
      const value = e.target.value;
      this.setState({
        playlist_id: parseInt(value, 10)
      })
    }
    handleSubmit(e){
      e.preventDefault()
      services.addSongToPlaylist(this.state)
      .then(result => {
        this.setState({
          fireRedirect: true
        })
      })
      .catch(err => {
        console.log(err);
      })

    }

    renderAddForm(){
      const playlists = this.state.playlists.map((playlist, id) => <button className="add-song-playlist-selector-button" key={id} value={playlist.playlist_id} onClick={this.handleChange}>{playlist.playlist_name}</button>)
      return(
        <div className="add-song-playlist-selector-container">
          <h1 className="add-song=h1">Select which playlist to add the song to</h1>
          <form className="add-song-form" onSubmit={this.handleSubmit}>
              {playlists}
          </form>
        </div>
      )
    }
    render(){
      return(
        <div className="add-song-container">
          {this.state.playlists ? this.renderAddForm() : ""}
          {this.state.fireRedirect ? <Redirect to="/home" /> : ''}
        </div>
      )
    }
}

export default AddSong;
