import axios from 'axios';

const services = {};


/*======== User Services ========*/

services.checkLoggedIn = (read) => {
  return axios({
    method: "get",
    url: "/isLoggedIn",
    headers: {
      Authorization: `Bearer ${read}`
    },
  })
}

services.getUser = (username) => {
  return axios.get(`/auth/${username}`);
}

services.getUserInfo = (username, userId) => {
  // console.log('in axios ---> ', username, userId);
  return axios.get(`/auth/${username}/${userId}`)
}

/*-------- END --------*/

/*======== Playlist Services ========*/

//Create
services.addPlaylist = (data) => {
  console.log(data);
  return axios({
    method: 'post',
    url: `/auth/${data.username}/${data.userId}`,
    data: {
      user_id: data.userId,
      playlist_name: data.playlist_name
    }
  })
}

//Read
services.getAllPlaylists = () => {
  return axios.get(`/playlist`)
}

services.getOnePlaylist = (id) => {
  return axios.get(`/playlist/${id}`)
}

services.getPlaylistSongs = (id) => {
  return axios.get(`/playlist/${id}/songs`)
}

//Update
services.editPlaylistName = (data) => {
  return axios({
    method: 'put',
    url: `/playlist/${data.playlist_id}`,
    data: {
      user_id: data.user_id,
      playlist_name: data.playlist_name,
      playlist_id: data.playlist_id
    }
  })
}

//Delete
services.deletePlaylist = (data) => {
  return axios({
    method: 'delete',
    url: `/playlist/${data.playlist_id}`,
    data: {
      playlist_id: data.playlist_id
    }
  })
}

services.removeSongFromPlaylist = (songData) => {
  console.log(`here is the song data that I am passing in from apiServices ---> `, songData)
  return axios({
    method: 'DELETE',
    url: `/playlist/${songData.playlist_id}`,
    data: {
      plist_id: songData.playlist_id,
      song_id: songData.song_id
    }
  })
}

/*-------- END --------*/

/*======== Song Services ========*/


services.getAllSongs = () => {
  return axios.get('/api/songs')
}

services.getOneSong = (id) => {
  return axios.get(`/api/songs/${id}`)
}

/*-------- END --------*/


//Still working on this!
// services.makeUser = (thing) => {
//   console.log('IM A THING ----> ', thing.username);
//   return axios({
//               method: 'post',
//               url: `/auth/`,
//               data: {
//                 username: thing.username,
//                 password: thing.password
//               }
//     })
// }


export default services;
