import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TokenService from './services/TokenService'

class TestComponent extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    console.log(`IS THIS MY USER DATA???? ----> `, window.localStorage);
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        // userData: window.localStorage.
      })
    })
    .catch(err => console.log(err))
  }
  render(){
    // console.log(this.props)
    return(
      <div>
        <h1>Im here!!!!</h1>
        <Link to='/songs'>All songs</Link>
      </div>
    )
  }
}

export default TestComponent
