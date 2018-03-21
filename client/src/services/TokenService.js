//This file contains all methods to store, read, and remove information from window.localStorage

//PLEASE DO NOT MODIFY WITHOUT ENTIRE GROUP PERMISSION

export default {
  save(token) {
    window.localStorage.setItem('authToken', token);
  },

  saveUser(id) {
    window.localStorage.setItem('user_id', id);
  },

  saveUsername(name) {
    window.localStorage.setItem('username', name);
  },

  read() {
    return window.localStorage.getItem('authToken') || '';
  },

  destroy() {
    window.localStorage.removeItem('authToken');
  },

};
