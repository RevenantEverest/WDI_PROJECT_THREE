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
  render() {
    return(
      <div>
      <h1> This is the First/Landing Page of the Template</h1>
      </div>
    )
  }
}

export default ComponentOne;
