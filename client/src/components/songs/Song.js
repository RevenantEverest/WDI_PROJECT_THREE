import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Playlist from '../playlists/Playlist';

//********* We can probably make this a Brian "dumb" Component ***************

class Song extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
  }
  componentDidMount(){

  }

  openModal() {
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
    console.log('Hello I Should Be Closing')
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  listPlaylists() {
    let playlists = <Playlist />;
  }

  render(){
    return(
      <div className="one_song_container">
          <Link to={`/songs/${this.props.songData.song_id}`}>{this.props.songData.title} | {this.props.songData.artist} | {this.props.songData.genre}</Link>
          <Link to={`/addsong/${this.props.songData.song_id}`}>Add song</Link>
      </div>

    )
  }
}
export default Song;
