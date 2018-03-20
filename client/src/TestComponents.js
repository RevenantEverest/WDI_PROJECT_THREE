import React, { Component } from 'react';
import axios from 'axios';
import TokenService from './services/TokenService';

class TestComponent extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    console.log('Im in componentDidMount');
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log(resp)
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        apiDataRecieved: true
      })
    })
    .catch(err => console.log(err))
  }
  render(){
    return(
      <h1>Im here!!!!</h1>
    )
  }
}

export default TestComponent
