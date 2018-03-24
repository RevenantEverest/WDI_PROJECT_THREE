import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
// import TestComponent from '../TestComponents';
import UserProfile from '../components/users/UserProfile';
import TokenService from '../services/TokenService';
import Home from './auth/Home'
import Register from './auth/Register';
import Login from './auth/Login';
import services from '../services/apiServices';


class UserHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      fireRedirect: false
    }
    this.renderTestComponent = this.renderTestComponent.bind(this);
    this.renderLogin = this.renderLogin.bind(this)
    // this.renderUserPage = this.renderUserPage.bind(this);
    // this.renderRegisterAndSignUp = this.renderRegisterAndSignUp.bind(this)
  }
  componentDidMount(){
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      // console.log(resp)
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        apiDataRecieved: true
      })
    })
    .catch(err => console.log(err))
  }

  checkUser(data){
    console.log(`I am checing the user`, data);
    services.getUser(data.username)
    .then(result => {
      alert(`User name already exists, please choose a unique username!`);
      this.setState({
        fireRedirect: true
      })
    })
    .catch(err => {
      console.log(`creating new user! ---> `, err, data);
      this.register(data)
    })
  }
  register(data){
    console.log(`I am the data`, data);
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      // console.log(`I am in Register ------> `, resp.data.user.user_id);
      TokenService.save(resp.data.token)
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      // console.log(`in window.localstorage!!!!`, window.localStorage);
      this.setState({
        userData: resp.data.user,
        isLoggedIn: resp.data.isLoggedIn,
      })
    })
    .catch(err => console.log(`err: ${err}`));
  }
  login(data){
    // console.log(data)
    axios(`http://localhost:3000/users/login`, {
      method: "POST",
      data
    }).then(resp => {
      // console.log(`I am in login ------> `, resp.data.user.user_id);
      TokenService.save(resp.data.token);
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      // console.log(`in window.localstorage!!!!`, window.localStorage);
      this.setState({
        userData: resp.data.user,
        isLoggedIn: resp.data.isLoggedIn,
      })
    })
    .catch(err => console.log(`err: ${err}`))
  }

  //can probably delete this, not currently in use

  authClick(event) {
    event.preventDefault();
    axios('http://localhost:3000/restricted', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log(resp))
    .catch(err => console.log(err))
  }

  logout(event) {
    event.preventDefault()
    TokenService.destroy();
    console.log("Im logged out");
  }
  renderLogin(){
    return(
      <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={(props) => (
        <Register {...props} submit={this.checkUser.bind(this)} />
      )} />
      <Route exact path="/login" component={(props) => (
        <Login {...props} submit={this.login.bind(this)} />
      )} />
      {this.state.fireRedirect ? <Redirect to='/' /> : ''}
    </div>
    )
  }
  renderTestComponent(){
    // console.log(`this is being rendered`);
    return(
      <div>
        <UserProfile />
      </div>
    )
  }
  render(){
    return window.localStorage.authToken && window.localStorage.authToken !== "undefined" ? this.renderTestComponent() : this.renderLogin()
  }
}

  export default UserHome;
