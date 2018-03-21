import React, { Component } from 'react';

//Might not need all of these imports, will reevaluate at the end

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

// setting initial state of this component, may not need all of these, we will state scrub at the end when the project is up and working

class UserHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      fireRedirect: false
    }

    //Still working on which functions in this page need binding....

    this.renderTestComponent = this.renderTestComponent.bind(this);
    this.renderLogin = this.renderLogin.bind(this)
    // this.renderUserPage = this.renderUserPage.bind(this);
    // this.renderRegisterAndSignUp = this.renderRegisterAndSignUp.bind(this)
  }

  //Upon load of this component, check to see if there is any token saved in localStorage and return a boolean

  //set state of isLoggedIn based on the boolean that is returned
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

  //Register function that creates a new user in the db, and stores it, need to work on the error handler here bc it will store two useres with the same name.

  register(data){
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      console.log(`I am in Register ------> `, resp.data.user.user_id);
      TokenService.save(resp.data.token)
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      console.log(`in window.localstorage!!!!`, window.localStorage);
      this.setState({
        userData: resp.data.user,
        //*********** WE ARE CHANGING THIS TO FIX THE LOGIN PROBLEM *********
        //REMOVE WHAT IS COMMENTED OUT
        // isLoggedIn: true,
        // fireRedirect: true
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
      console.log(`I am in login ------> `, resp.data.user.user_id);
      TokenService.save(resp.data.token);
      TokenService.saveUser(resp.data.user.user_id);
      TokenService.saveUsername(resp.data.user.username);
      console.log(`in window.localstorage!!!!`, window.localStorage);
      this.setState({
        userData: resp.data.user,
        //*********** WE ARE CHANGING THIS TO FIX THE LOGIN PROBLEM *********
        //REMOVE WHAT IS COMMENTED OUT
        // isLoggedIn: true,
        // fireRedirect: true
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
        <UserProfile />
      </div>
    )
  }
  render(){
    //*********** WE ARE CHANGING THIS TO FIX THE LOGIN PROBLEM *********
    //CHECK YOUR CODE TO SEE WHAT IS DIFFERENT HERE

    //we should also now change the name of the method from renderTestComponent to render UserProfile..

    //also we should address the fact that if you go to / index route, it nomatter what redirects to the login register page, might be a simple fix but not necessary at this moment for functionality.....tried it again after I wrote this and its working now ---> lets keep this comment and continue to preform tests on the functionality of this...might be becasue of the login problem that was fixed

    return window.localStorage.authToken && window.localStorage.authToken !== "undefined" ? this.renderTestComponent() : this.renderLogin()
  }
}

  export default UserHome;
