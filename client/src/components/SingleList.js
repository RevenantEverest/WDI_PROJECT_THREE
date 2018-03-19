import React, { Component } from 'react';

class SingleList extends Component {
  constructor(props){
    super(props);
    this.state = {
      playListName: '',
      artistName: '',
      songName: '',
      image: '',
      lyrics:''
	}
  }

  
  render() {
    return(
      <div>
      <h1> This is the Playlist contents</h1>
      </div>
    )
  }
}


export default SingleList;