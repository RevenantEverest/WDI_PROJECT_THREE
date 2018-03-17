import React, { Component } from 'react';
import services from '../services/apiServices';


class OnePlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
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
  render(){
    return(
      <div>
        {this.state.apiDataRecieved ? this.renderPlaylist() : <p>Loading.....</p>}
      </div>
    )
  }
}

export default OnePlaylist;
