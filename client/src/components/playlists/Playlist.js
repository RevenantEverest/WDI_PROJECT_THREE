import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DeletePlaylist from './DeletePlaylist';

class Playlist extends Component {
  render(){
    // console.log(this.props);
    return(
      <div className={this.props.playlist.playlist_name}>
        <Link to={`/playlist/${this.props.playlist.playlist_id}`}>{this.props.playlist.playlist_name}</Link>
        <Link to={`playlist/edit/${this.props.playlist.playlist_id}`}>Edit this playlist</Link>
        <DeletePlaylist playlist={this.props.playlist} />
      </div>
    )
  }
}
export default Playlist;
