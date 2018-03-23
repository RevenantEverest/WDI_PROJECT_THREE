import React, { Component } from 'react';
import services from '../../services/apiServices';


class PublicProfiles extends Component {
  constructor(props){
    super(props)
    this.state ={
      apiDataRecieved: false
    }
    this.renderProfiles = this.renderProfiles.bind(this)
  }

  componentDidMount(){
    console.log(`mounting the Public Profiles`);
    services.getPublicUsers()
    .then(results => {
      console.log('Got the users and am back to the PublicProfiles page', results);
      this.setState({
        publicProfiles: results.data.data,
        apiDataRecieved: true
      })
    })
    .catch(err => {
      console.log(`you fucking suck with this shit dude, c'mon!`);
    })
  }

  renderProfiles(){
    const allProfiles = this.state.publicProfiles.map((profile, id) => <h3 key={id}>{profile.username}</h3>)
    return (
      <div>
        <h1>I am the PublicProfiles Component</h1>
        {allProfiles}
      </div>
    )
  }

  render(){
    return(
    <div>
      {this.state.apiDataRecieved ? this.renderProfiles() : ''}
    </div>
    )
  }
}

export default PublicProfiles
