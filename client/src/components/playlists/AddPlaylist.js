import React, {Component} from 'react';
import services from '../../services/apiServices';
import {Redirect} from 'react-router-dom';

class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      fireRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      userId: parseInt(window.localStorage.user_id),
      playlist_name: this.state.playlist_name
    }
    services.addPlaylist(data)
    .then(result => {
      this.setState({
        fireRedirect: true
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="addPlaylist">
        <form className="add-playlist-form" onSubmit={this.handleSubmit}>
          <input className="add-playlist-input-playlist_name" type="text" name="playlist_name" onChange={this.handleChange} placeholder="playlist name" />
          <input className="add-playlist-input-submit" type="submit" value="Add!" />
        </form>
        {this.state.fireRedirect ? <Redirect to='/' /> : ''}
      </div>
    )
  }

}
export default AddPlaylist;
