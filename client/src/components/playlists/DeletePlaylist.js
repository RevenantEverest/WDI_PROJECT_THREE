import React, { Component } from 'react';
import axios from 'axios';
import services from '../../services/apiServices';

class DeletePlaylist extends Component {
      constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
      }
      handleClick(e){
        e.preventDefault();
        console.log(`I am deleting the playlist, `, this.props);
        services.deletePlaylist(this.props)
        .then(result => {
          alert(`Playlist was deleted!`)
          console.log(`playlist ${this.props} was deleted!`);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        })
      }
      render(){
        return(
          <div className="delete-playlist-container">
            <button className="delete-playlist-deleteButton" onClick={this.handleClick}>Delete</button>
          </div>
        )
      }
}

export default DeletePlaylist
