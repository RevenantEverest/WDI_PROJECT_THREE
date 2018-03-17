import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//********* We can probably make this a Brian "dumb" Component ***************

class Song extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // console.log(this.props);
  }
  render(){
    return(
      <div className="one_song">
        <Link to={`/songs/${this.props.songData.song_id}`}>{this.props.songData.title} | {this.props.songData.artist} | {this.props.songData.genre}</Link>
      </div>
    )
  }
}
export default Song;
