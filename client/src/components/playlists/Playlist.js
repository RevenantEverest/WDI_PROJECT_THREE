import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Playlist extends Component {
  render(){
    console.log(this.props);
    return(
      <div className={this.props.playlist.playlist_name}>
        <Link to={`/playlist/${this.props.playlist.playlist_id}`}>{this.props.playlist.playlist_name}</Link>
      </div>
    )
  }
}
export default Playlist;
