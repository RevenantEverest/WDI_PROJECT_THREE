import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Route
} from 'react-router-dom';
import Register from './Register';
import Login from './Login0';
import Home from './Home';

class MainRouter extends Component {
  constructor(props){
    super(props);
    this.state={
      fireRedirect: false,
    }
  }
  handleRegister(data){
    this.props.register(data)
  }
  handleLogin(data) {
    this.props.login(data)
  }
  render(){
    return (
      <div>
        {/* <div>
          {/* Weird button: <button onClick={this.authClick.bind(this)}>Weird Button</button>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p> */}

              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.handleRegister.bind(this)} />
              )} />
              <Route exact path="/login" component={(props) => (
                <Login {...props} submit={this.handleLogin.bind(this)} />
              )} />
        </div>
      )
  }
}

export default MainRouter
