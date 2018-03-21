import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import services from '../../services/apiServices';
import Song from './Song';
import TokenService from '../../services/TokenService'


class AllSongs extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataRecieved: false,
      apiData: null,
      isLoggedIn: false
    }
    this.renderData = this.renderData.bind(this)
  }

  //I dont think that we need this here because there is nothing on this component that needs user specific information, if we do decide that we want to require user specific information, then we need to change the error handler


  componentDidMount() {
    services.checkLoggedIn(TokenService.read())
    .then(resp => {
      console.log(`IN RESPONSE ____>`, resp.data.isLoggedIn)
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
      })
      this.getData()
    })
    .catch(err => console.log(err))
  }

  //call to get all of the data from the Database, KHALID, this is were we can change this to call your music API

  getData(){
    // console.log(`Im here as the state in all songs ---> `, this.props);
    services.getAllSongs()
    .then(result => {
      // console.log(result);
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })

    })
    .catch(error => {
      console.log(error);
    })
  }

  //render the page once api data is loaded, this will be especially important if we are actually calling from the api with a relatively large response time.

  renderData(){
    const allSongs = this.state.apiData.map((song, id) => <Song userData={this.props.userData} songData={song} key={id}/>)
    return(
      <div className="full_library">
        <h1>All songs in the Database</h1>
        {allSongs}
    </div>
    )
  }
  render(){
    return(
      <div>
      {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderData() : <h1>Oops this is awkward <span>😳</span></h1>}
      </div>
    )
  }
}

export default AllSongs;
