import React, { Component } from 'react';
import axios from 'axios';

class ComponentTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDataRecieved: false,
      apiData: null
    }
    this.renderData = this.renderData.bind(this)
  }
  componentDidMount(){
    axios.get('/api/testmain')
    .then(res => {
      this.setState({
        apiDataRecieved: true,
        apiData: res.data.data
        })
      })
    .catch(err => {
      console.log(err);
    })
  }

  renderData(){
    return(
     this.state.apiData.map((el, i) => {
        return(
          <div key={i}>
          <h1> This is the Second Page of the Template</h1>
          <h2>Creator: </h2>
          <p>{el.name}</p>
          <h2>Extra Data: </h2>
          <p>{el.expression}</p>
          </div>
        )
      })
    )
  }

  render() {
    return(
      <div>
      {this.state.apiDataRecieved ? this.renderData() : <p>"This is the Second Page of the Template and the data is fucked"</p>}
      </div>
    )
  }
}

export default ComponentTwo;
