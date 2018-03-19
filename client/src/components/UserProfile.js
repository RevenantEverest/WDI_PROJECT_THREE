import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName:'',
      playListName: '',
      addPlayList: '',
      deletePlayList: '',
      addMusic: ''

    }
  }
  render() {
    return(
      <div>
      <h1> This is the Users Profile Page</h1>
      </div>
    )
  }
}

export default UserProfile;
