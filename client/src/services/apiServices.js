import axios from 'axios';

const services = {};


services.getAll = () => {
  return axios.get('/api/songs')
}

services.getOne = (id) => {
  return axios.get(`/api/songs/${id}`)
}

services.getUser = (username) => {
  return axios.get(`/auth/${username}`);
}

services.makeUser = (thing) => {
  console.log('IM A THING ----> ', thing.username);
  return axios({
              method: 'post',
              url: `/auth/`,
              data: {
                username: thing.username,
                password: thing.password
              }
    })
}


export default services;
