import React, {Component} from 'react';
import services from '../services/apiServices';
import {Redirect} from 'react-router-dom'

class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      firRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    // console.log(this.state);
  }
  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const data = {
      username: this.state.userData.username,
      userId: this.state.userData.user_id,
      playlist_name: this.state.playlist_name
    }
    services.addPlaylist(data)
    .then(result => {
      console.log(`Inserted new Playlist ----> `, result);
      this.setState({
        firRedirect: true
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="playlist_name" onChange={this.handleChange} placeholder="playlist name" />
          <input type="submit" value="Add!" />
        </form>
        {this.state.firRedirect ? <Redirect to='/' /> : ''}
      </div>
    )
  }

}
export default AddPlaylist;
