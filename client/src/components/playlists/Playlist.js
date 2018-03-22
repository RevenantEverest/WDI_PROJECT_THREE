import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import EditPlaylist from './EditPlaylist';


//can make this a dumb component

//this renders each playlist on the UserProfile page

class Playlist extends Component {
  render(){
    // console.log(this.props);
    return(
      <div className={this.props.playlist.playlist_name}>
        <Link to={`/playlist/${this.props.playlist.playlist_id}`}>{this.props.playlist.playlist_name}</Link>
        <Link to={`/edit/${this.props.playlist.playlist_id}`}>Edit Name</Link>

      </div>
    )
  }
}
export default Playlist;
