import React, { Component } from 'react';
import services from '../../services/apiServices';
import { Redirect } from 'react-router-dom';

class EditPlaylist extends Component {
    constructor(props){
      super(props);
      this.state ={
        fireRedirect: false,
        playlist_id: this.props.match.params.id
      }
      // console.log(this.props);
    }
    handleChange(e){
      const value = e.target.value;
      const name = e.target.name;
      this.setState({
        [name]: value
      })
    }
    handleSubmit(e){
      e.preventDefault();
      services.updateName(this.state)
      .then(result => {
        console.log(`im in the result!!!!!!!! `, result.data.data.playlist_name);
        alert(`Playlist name changed to ${result.data.data.playlist_name}`)
        this.setState({
          fireRedirect: true,
        })
      })
    }

    render(){
      return(
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' name='playlist_name' placeholder='new name' onChange={this.handleChange.bind(this)} />
            <input type='submit' value='edit' />
          </form>
          {this.state.fireRedirect ? <Redirect to="/home" /> : ''}
        </div>
      )
    }
}



export default EditPlaylist;
