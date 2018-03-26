import axios from 'axios';

const searchServices = {};

searchServices.search = (data) => {
	if(data.songName && !data.artistName){
		// console.log('I made It to song!!!', data.songName)
		return axios.get(`https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback&q_track=${data.songName}&quorum_factor=1&page_size=100&apikey=77bc1b55c3630f3ec6652146b1a6a496`, )

	} else if (!data.songName && data.artistName){
		// console.log('I made it to artist!!!', data.artistName)
		return axios.get(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=json&callback=callback&page=10&page_size=20&country=us&apikey=77bc1b55c3630f3ec6652146b1a6a496
`)
	}else {
		alert(`please choose one!`)
		//window.location.reload()
	}
}

export default searchServices;
