import React, { Component } from 'react';

import {
  Route,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
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
    this.renderLogin = this.renderLogin.bind(this)
  }
  componentDidMount(){
  services.checkLoggedIn(TokenService.read())
    .then(resp => {
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
      alert(`User name already exists, please choose a new username!`);
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
    axios('/users/', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token)
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      this.setState({
        userData: resp.data.user,
        isLoggedIn: resp.data.isLoggedIn,
        fireRedirect: true
      })
    })
    .catch(err => console.log(`err: ${err}`));
  }
  login(data){
    axios(`/users/login`, {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      this.setState({
        userData: resp.data.user,
        isLoggedIn: resp.data.isLoggedIn,
      })
      window.location.reload();
    })
    .catch(err => {
      alert(`No user found by that name, please sign up!`)
    })
  }

  //Not used here but really nice to have

  // authClick(event) {
  //   event.preventDefault();
  //   axios('/restricted', {
  //     headers: {
  //       Authorization: `Bearer ${TokenService.read()}`,
  //     },
  //   }).then(resp => console.log(resp))
  //   .catch(err => console.log(err))
  // }

  logout(event) {
    event.preventDefault()
    TokenService.destroy();
    console.log("Im logged out");
  }
  renderLogin(){
    return(
      <div className="user-home-render-login-container">
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

  renderLoginTwo() {
    return(
      <div>
        {/*<Route exact path="/" component={Home} />*/}
        <Route exact path="/register" component={(props) => (
          <Register {...props} submit={this.checkUser.bind(this)} />
        )} />
        <Route exact path="/login" component={(props) => (
          <Login {...props} submit={this.login.bind(this)} />
        )} />
      </div>
    );
  }

  render(){
    return(
      <div>
        {/*window.localStorage.authToken && window.localStorage.authToken !== "undefined" ? this.renderTestComponent() : this.renderLogin()*/}
        <Route exact path="/home" component={Home} />
        <div className="user-home-render-login-container">
          {window.location.pathname === "/register" ? <Register /*{...props}*/ submit={this.checkUser.bind(this)} /> : <Login /*{...props}*/ submit={this.login.bind(this)} />}
          {this.state.fireRedirect ? <Redirect to='/' /> : ''}
        </div>
      </div>
    );
  }
}

  export default UserHome;
