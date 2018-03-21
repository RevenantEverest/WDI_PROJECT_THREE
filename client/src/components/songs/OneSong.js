import React, { Component } from 'react';
import services from '../../services/apiServices';

//this component renders a single song and all of the information about that song, there are multiple ways to handle this, we can just re-call the API or we can have the song saved in the db and then call the db, this one is up to you KHALID AND BRADFORD

class OneSong extends Component{
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }

  //KHALID and BRADFORD, this is where you have to make the change if the song is not in our db.

  componentDidMount(){
    console.log(`inside did mount`);
    services.getOne(this.props.match.params.id)
    .then(result => {
      // console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    .catch(error => {
      console.log(`Woops! ----> `, error);
    })
  }

  //Render the song sheet when the information is loaded

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
