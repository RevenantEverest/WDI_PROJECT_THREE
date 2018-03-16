import React, { Component } from 'react';

class ComponentThree extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstStateMethod: ""
    }
  }
  render() {
    return(
      <div>
      <h1> This is the Third Page of the Template</h1>
      </div>
    )
  }
}

export default ComponentThree;
