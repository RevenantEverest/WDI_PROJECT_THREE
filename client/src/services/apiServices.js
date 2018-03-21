//as of now, these are all of the "api" calls to our backend, these services may include the imcorperation of Khalid's calls to the api calls. Also, stefan, lets get together and comment each route here to show exactly where each of these is going...because you had a large part in the back-end, im not even sure from a glance where everything is going....this will save everyone a lot of console.log() statements

import axios from 'axios';

const services = {};

//check to see if the user is logged in from the '/isLoggedIn' route on server.js in the server dir

services.checkLoggedIn = (read) => {
  return axios({
    method: "get",
    url: "/isLoggedIn",
    headers: {
      Authorization: `Bearer ${read}`
    },
  })
}

//index route for the '/api/songs' route on the server.js file in the server dir

services.getAllSongs = () => {
  return axios.get('/api/songs')
}

//index route for the '/api/songs/:id' route on the server.js file in the server dir

services.getOneSong = (id) => {
  return axios.get(`/api/songs/${id}`)
}

//user route on the server.js in server dir, this route uses both the username and the user id for the path.  This is a way of passing what is stored in window.localStorage to the back end, apperently there are other ways to do it that are less clean but more "proper"......this works and we are this far so I (ryan) think that we should stick with it.

//not sure if this one is needed anyomore, we will do a scrub of useless information/methods towards the end of the week.

services.getUser = (username) => {
  return axios.get(`/auth/${username}`);
}

//user route on the server.js in server dir, this route uses both the username and the user id for the path.

services.getUserInfo = (username, userId) => {
  // console.log('in axios ---> ', username, userId);
  return axios.get(`/auth/${username}/${userId}`)
}

//a POST to the user's specific path which will store the playlist to the user based on the imformation from that user

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

//STEFAN, this is where you take over...

services.getAllPlaylists = () => {
  return axios.get(`/playlist`)
}

services.getOnePlaylist = (id) => {
  return axios.get(`/playlist/${id}`)
}

services.getPlaylistSongs = (id) => {
  return axios.get(`/playlist/${id}/songs`)
}

//we can remove what is commented out below, no longer used, was created in early development

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
