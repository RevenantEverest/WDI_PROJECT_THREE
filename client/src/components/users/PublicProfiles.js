import React, { Component } from 'react';
import services from '../../services/apiServices';
import { Link } from 'react-router-dom'


class PublicProfiles extends Component {
  constructor(props){
    super(props)
    this.state ={
      apiDataRecieved: false
    }
    this.renderProfiles = this.renderProfiles.bind(this)
  }

  componentDidMount(){
    // console.log(`mounting the Public Profiles`);
    services.getPublicUsers()
    .then(results => {
      // console.log('Got the users and am back to the PublicProfiles page', results);
      this.setState({
        publicProfiles: results.data.data,
        apiDataRecieved: true
      })
    })
    .catch(err => {
    })
  }

  renderProfiles(){
    const allProfiles = this.state.publicProfiles.map((profile, id) => <Link key={id} to={`/public/${profile.user_id}`}>{profile.username}</Link>)
    return (
      <div>
        <h1>Public Profiles</h1>
        <h2>{allProfiles}</h2>
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
