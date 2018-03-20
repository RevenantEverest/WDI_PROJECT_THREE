import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TokenService from './services/TokenService';
import services from './services/apiServices';

class TestComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }
  componentDidMount() {
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log(resp)
      this.setState({
        isLoggedIn: true,
      })
    })
    .catch(err => console.log(err))
    this.getData();
  }

  getData() {
    services.getAllPlaylists()
    .then(result => {
      this.setState({
        apiDataRecieved: true,
        apiData: result.data.data
      })
    })
    .catch(err => {
      console.log(`No data, but here's an error =>`, err)
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <h1>Welcome Back {window.localStorage.username}</h1>
        <p></p>
        {console.log(this.state.apiData)}
      </div>
    )
  }
}

export default TestComponent;
