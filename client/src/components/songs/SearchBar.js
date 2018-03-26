import React, { Component } from 'react';
import searchServices from '../../services/searchServices';
import AddSongFromApi from './AddSongFromApi'
// import songList from './songList'

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiDataLoaded: false,
			// apiData: null,
			// songName:'',
			// artistName:'',
			// albumName:'',
			// albumArt:'',
			// releaseDate:'',
			// songRating:'',
			// song: '',
			results: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		// this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleChange(e) {
		// console.log(e)
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(e){
		this.setState({
			apiDataLoaded: false
		})
		e.stopPropagation();
		e.preventDefault();
		searchServices.search(this.state)

		.then(result => {
			this.setState({
				apiDataLoaded: true,
				results: result.data.message.body.track_list
			})
		})
		.catch(err => {
			console.log(err)
		})
	}



	renderSongs(){
		return(
			this.state.results.map((el, i) => {
				let newGenre = ""
				if(el.track.primary_genres.music_genre_list[0]) {
					newGenre = el.track.primary_genres.music_genre_list[0].music_genre.music_genre_name
				} else {
					newGenre = "None"
				}
				return(
					<div key={i}>
					<p>
					artist:{el.track.artist_name}<br />
					title:{el.track.track_name}<br />
					release_date:{el.track.first_release_date}<br />
					album:{el.track.album_name}<br />
					rating:{el.track.track_rating}<br />
					genre: {newGenre}
					</p>
					<AddSongFromApi songData={el} />
					</div>

					)
			})
			)
	}

	render(){
		return(
			<div>
			<form onSubmit={this.handleSubmit}>
			{/*<input type="text" name="topSongs" onChange={this.handleChange} placeholder="Top 50" />*/}
			<input type="text" name="songName" onChange={this.handleChange} placeholder="Search Song" />
			<input type="submit" value="search" />

			{this.state.apiDataLoaded ? this.renderSongs() : ''}

			</form>
			</div>
			)
	}
}

export default SearchBar;
