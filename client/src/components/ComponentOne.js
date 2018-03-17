import React, { Component } from 'react';
// import axios from 'axios';

class ComponentOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
  }
  componentDidMount(){
    console.log(this.props);
    this.setState({
      userData: this.props.userData,
    })
  }
  renderUserHomepage(){
    return(
      <h1>Welcome back {this.state.userData.username}!</h1>
    )
  }
  render() {
    return(
      <div>
      {this.state.userData ? this.renderUserHomepage() : 'OOPS!!!!'}
      </div>
    )
  }
}

export default ComponentOne;
