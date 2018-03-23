import React, { Component } from 'react';
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
  getData(){
    services.getAllSongs()
    .then(result => {
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })

    })
    .catch(error => {
      console.log(error);
    })
  }
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
      {this.state.apiDataRecieved && this.state.isLoggedIn ? this.renderData() : <h1>Oops this is awkward</h1>}
      </div>
    )
  }
}

export default AllSongs;
