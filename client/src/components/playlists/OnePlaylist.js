import React, { Component } from 'react';
import services from '../../services/apiServices';


class OnePlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null,
      editState: false
    }
  }
  componentDidMount(){
    console.log(`IN ONE PLAYLIST FOR ----> `, this);
    services.getPlaylistInfo(this.props.match.params.id)
    .then(result => {
      console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })
  }

  renderPlaylist(){
    return this.state.apiData.map((song, id) => {
      return(
        <div>
          <h1>{song.title}</h1>
        </div>
      )
    })
  }

  handleEditState() {
    if(!this.state.editState) {
      this.setState({
        editState: true
      })
      let editButton = document.querySelector('.edit-playlist');
      editButton.style.backgroundColor = "black";
      editButton.style.color = "#B2006E";
    }else {
      this.setState({
        editState: false
      });
      let editButton = document.querySelector('.edit-playlist');
      editButton.style.backgroundColor = "inherit";
      editButton.style.color = "inherit";
    }
  }

  render(){
    return(
      <div>
        {this.state.apiDataRecieved ? this.renderPlaylist() : <p>Loading.....</p>}
        <button className="edit-playlist" onClick={(e) => this.handleEditState()}>Edit</button>
      </div>
    )
  }
}

export default OnePlaylist;
