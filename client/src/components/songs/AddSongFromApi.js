import React, { Component } from 'react';
import services from '../../services/apiServices';
import {Redirect} from 'react-router-dom';

class AddSongTwo extends Component {
  constructor(props){
    super(props);
    this.state ={
      fireRedirect : false
    }
    // this.handleButtonClick = this.handleButtonClick.bind(this)
    // this.insertIntoLibrary = this.insertIntoLibrary.bind(this)
    this.insert = this.insert.bind(this)
  }

  handleButtonClick(e){
    e.preventDefault();
    let newGenre = ""
    if(this.props.songData.track.primary_genres.music_genre_list[0]){
      newGenre = this.props.songData.track.primary_genres.music_genre_list[0].music_genre.music_genre_name
    } else {
      newGenre = "None"
    }
     this.setState({
        artist: this.props.songData.track.artist_name,
        title: this.props.songData.track.track_name,
        release_date: this.props.songData.track.release_date,
        album: this.props.songData.track.album_name,
        rating: this.props.songData.track.track_rating,
        genre: newGenre,
      }, this.insert)
    }
    //add to song library
    //show playlists
insert(){
  services.insertIntoLibrary(this.state)
  .then(result => {
    console.log(`I AM THE RESULT !!!! FUCK YES!`, result);
    this.setState({
      fireRedirect: true,
      song_id: result.data.data.song_id
    })
  })
  .catch(err => {
    console.log(`You done fucked up!`, err);
  })
}


  render(){
    return(
      <div>
        <button  onClick={(e) => this.handleButtonClick(e)}> + </button>
        <div>
        {this.state.fireRedirect ? <Redirect to={`/addsong/${this.state.song_id}`} /> : ""}
      </div>
      </div>
    )
  }
}

export default AddSongTwo;
