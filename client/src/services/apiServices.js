import axios from 'axios';

const services = {};

services.checkLoggedIn = (read) => {
  return axios({
    method: "get",
    url: "/isLoggedIn",
    headers: {
      Authorization: `Bearer ${read}`
    },
  })
}

services.getAllSongs = () => {
  return axios.get('/api/songs')
}

services.getOneSong = (id) => {
  return axios.get(`/api/songs/${id}`)
}

services.getUser = (username) => {
  return axios.get(`/auth/${username}`);
}

services.getUserInfo = (username, userId) => {
  // console.log('in axios ---> ', username, userId);
  return axios.get(`/auth/${username}/${userId}`)
}
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
services.getAllPlaylists = () => {
  return axios.get(`/playlist`)
}

services.getOnePlaylist = (id) => {
  return axios.get(`/playlist/${id}`)
}

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
