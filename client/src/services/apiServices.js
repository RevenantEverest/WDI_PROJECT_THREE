import axios from 'axios';

const services = {};


services.getAll = () => {
  return axios.get('/api/songs')
}

services.getOne = (id) => {
  return axios.get(`/api/songs/${id}`)
}


export default services;
