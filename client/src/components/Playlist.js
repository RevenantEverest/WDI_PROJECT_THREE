import React, {Component} from 'react';

class PlayList extends Component {
  render(){
    return(
      <div>
      <h1>{this.props.playlist.playlist_name}</h1>
      </div>
    )
  }
}
export default PlayList
