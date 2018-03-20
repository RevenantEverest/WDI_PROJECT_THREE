import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import TokenService from './services/TokenService';
// import MainRouter from './components/MainRouter';
// import HomePageRender from './components/HomePageRender'
import Register from './components/Register';
import Login from './components/Login0';
import UserProfile from './components/UserProfile';
import AllSongs from './components/songs/AllSongs';
import OneSong from './components/songs/OneSong';
import OnePlaylist from './components/playlists/OnePlaylist';
import services from './services/apiServices';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      fireRedirect: false
    }
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
  renderUserPage(){
    return (
      <div>
        <Router>
          <div>
            <div className="navBar">
              <div className="searchBarContainer">
                <input className="searchBar" type="text" name="search" placeholder="Search" />
              </div>
              <nav>
                <div className="navBarContent">
                  <Link className="navBarHome" to='/home'>Home</Link>
                  <Link className="navBarSongs" to='/songs'>Songs</Link>
                </div>
                <button className="logoutButton" onClick={this.loggingOut}>Log Out</button>
              </nav>
            </div>
            <Route exact path='/home' render={UserProfile} />
            <Route path='/playlist/:id' component={OnePlaylist} />
            <Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
            <Route path='/songs/:id' component={OneSong}/>
          </div>
        </Router>
      </div>
    );
  }

  renderRegisterAndSignUp(){
    return (
      <div>
        {/* <div>
          {/* Weird button: <button onClick={this.authClick.bind(this)}>Weird Button</button>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p> */}
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={(props) => (
              <Register {...props} submit={this.register.bind(this)} />
            )} />
            <Route exact path="/login" component={(props) => (
              <Login {...props} submit={this.login.bind(this)} />
            )} />
          </Switch>
        </Router>
      </div>
    )
  }


  render(){

    return(
      <div>
        <Router>
        <div>
          {this.state.fireRedirect ? <Redirect to='/home' /> : ''}
          {/* {this.state.isLoggedIn ? <HomePageRender /> : <MainRouter register={this.register.bind(this)} login={this.login.bind(this)} />} */}

        </div>
    </Router>
    </div>
    )
}
}
export default App;
