import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loggingOut = this.loggingOut.bind(this);
  }
  componentDidMount(){
    //console.log(this.props.data);
  }

  loggingOut(e) {
    e.preventDefault();
    this.setState({
      isLoggedIn: false
    });
  }
  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e){
    e.preventDefault();
    services.getUser(this.state.username)
    .then(result => {
      // console.log(result);
      this.setState({
        isLoggedIn: true,
        userData: result.data.data
      })
    })
    .catch(error => {
      console.log('Im the error!!! ', error);
      this.setState({
        fireRedirect: true
      })
    })
  }

  handleLogInClick(){
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "none";
  }

  render() {
    if(!this.state.isLoggedIn) {
      return(
        <div>
          <button className="loginButton" onClick={(e) => this.handleLogInClick()}>Log In</button>
          <div className="simpleModal">
            <div className="modalContent">
              <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
              <h1 className="modalHeading">Welcome Back!</h1>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <input className="log-in-username"
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                    placeholder="User Name"
                  />
                  <input className="log-in-password"
                    type="text"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                  <input className="logIn-input" type="submit" value="Log In!" />
                </form>
                <p>Or you can <a className="sign-Up">Sign-up</a></p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
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
                    <Link className="navBarHome" to='/'>Home</Link>
                    <Link classname="navBarSongs" to='/songs'>Songs</Link>
                  </div>
                  <button className="logoutButton" onClick={this.loggingOut}>Log Out</button>
                </nav>
              </div>
              <Route exact path='/' render={() => <UserProfile userData={this.state.userData} />} />
              <Route path='/playlist/:id' component={OnePlaylist} />
              <Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
              <Route path='/songs/:id' component={OneSong}/>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
