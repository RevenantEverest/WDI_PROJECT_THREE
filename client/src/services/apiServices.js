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

services.getSecurity = (username) => {
  // console.log(`In apiServices -----> `, username);
  return axios.get(`/auth/user/${username}/`)
}
services.changeSecurity = (userdata, cred) => {
  // console.log(`In apiServices -----> `, userdata, cred);
  return axios({
          method: "PUT",
          url: `/auth/user/${userdata.username}/`,
          data: {
            security: cred,
            user_id: userdata.user_id
          }
  })

}

services.getPublicUsers = () => {
  // console.log(`in the apiServices`);
  return axios.get(`/auth/public`)
}

services.getUser = (username) => {
  return axios.get(`/auth/user/${username}`);
}

services.getUserInfo = (username, userId) => {
  console.log('in axios ---> ', username, userId);
  return axios.get(`/auth/user/${username}/${userId}`)
}

/*-------- END --------*/

/*======== Playlist Services ========*/

//Create
services.addPlaylist = (data) => {
  console.log(data);
  return axios({
    method: 'post',
    url: `/auth/user/${data.username}/${data.userId}`,
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

services.addSongToPlaylist = (data) => {
  return axios({
              method: "post",
              url: `/playlist/${data.playlist_id}`,
              data: {
                plist_id: data.playlist_id,
                song_id: data.song_id
              }
  })
}

//Update
services.editPlaylistName = (data) => {
  console.log(`made it to edit! `, data);
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
  console.log(`in api services for delete playlist`, data);
  return axios({
    method: 'delete',
    url: `/playlist/${data.playlist.playlist_id}`,
    data: {
      playlist_id: data.playlist.playlist_id
    }
  })
}

services.removeSongFromPlaylist = (songData) => {
  console.log(`here is the song data that I am passing in from apiServices ---> `, songData)
  return axios({
    method: 'DELETE',
    url: `/song/${songData.song_id}`,
    data: {
      plist_id: songData.playlist_id,
      song_id: songData.song_id
    }
  })
}

/*-------- END --------*/

/*======== Song Services ========*/


services.getAllSongs = () => {
  return axios.get('/song')
}

services.getOneSong = (id) => {
  return axios.get(`/song/${id}`)
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
