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
        <div className="one_song">
          <Link to={`/songs/${this.props.songData.song_id}`}>{this.props.songData.title} | {this.props.songData.artist} | {this.props.songData.genre}</Link>
            <button className="addSongButton" onClick={(e) => this.openModal()}> + </button>
            <div className="simpleModal">
              <div className="modalContent">
                <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
                <h1 className="modalHeading">Which playlist would you like to add too?</h1>
                <select>
                  <option>Placeholer 1</option>
                  <option>Placeholer 2</option>
                  <option>Placeholer 3</option>
                </select>
                <input type="submit" value="Add" />
              </div>
            </div>
        </div>
      </div>

    )
  }
}
export default Song;
