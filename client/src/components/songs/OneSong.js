import React, { Component } from 'react';
import services from '../../services/apiServices';


class OneSong extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }
  componentDidMount(){
    services.getOneSong(parseInt(this.props.match.params.id, 10))
    .then(result => {
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })
  }

  renderSong(){
    return(
      <div className="one-song-data-container">
        <h1 className="one-song-title">Title: {this.state.apiData.title}</h1>
        <h2 className="one-song-artist">Artist: {this.state.apiData.artist}</h2>
        <h3 className="one-song-genre">Genre: {this.state.apiData.genre}</h3>
      </div>
    )
  }

  render(){
    return(
      <div className="one-song-container">
        {this.state.apiDataRecieved ? this.renderSong() : <p>Loading.....</p>}
      </div>
    )
  }
}

export default OneSong;
