import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import TestComponent from '../TestComponents';
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
      console.log(resp)
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        apiDataRecieved: true
      })
    })
    .catch(err => console.log(err))
  }

  register(data){
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      console.log(`I am in Register ------> `, resp);
      TokenService.save(resp.data.token)
      this.setState({
        userData: resp.data.user,
        isLoggedIn: true,
        fireRedirect: true
      })
    })
    .catch(err => console.log(`err: ${err}`));
  }
  login(data){
    console.log(data)
    axios(`http://localhost:3000/users/login`, {
      method: "POST",
      data
    }).then(resp => {
      console.log(`I am in login ------> `, resp);
      TokenService.save(resp.data.token);
      this.setState({
        userData: resp.data.user,
        isLoggedIn: true,
        fireRedirect: true
      })
    })
    .catch(err => console.log(`err: ${err}`))
  }

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
  checkLogin() {
    axios(`http://localhost:3000/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log(resp)
      this.setState({
        isLoggedIn: true,
      })
    })
    .catch(err => console.log(err))
  }
  renderLogin(){
    return(
      <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={(props) => (
        <Register {...props} submit={this.register.bind(this)} />
      )} />
      <Route exact path="/login" component={(props) => (
        <Login {...props} submit={this.login.bind(this)} />
      )} />
    </div>
    )
  }
  renderTestComponent(){
    console.log(`this is being rendered`);
    return(
      <div>
        <TestComponent />
      </div>
    )
  }
  render(){
    return this.state.fireRedirect ? this.renderTestComponent() : this.renderLogin()
  }
}

  export default UserHome;
