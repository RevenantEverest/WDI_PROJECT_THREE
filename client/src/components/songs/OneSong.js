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
    })
  }

  renderSong(){
    return(
      <div className="one_song">
        <h1>{this.state.apiData.title}</h1>
        <h2>{this.state.apiData.artist}</h2>
        <h3>{this.state.apiData.genre}</h3>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.state.apiDataRecieved ? this.renderSong() : <p>Loading.....</p>}
      </div>
    )
  }
}

export default OneSong;
