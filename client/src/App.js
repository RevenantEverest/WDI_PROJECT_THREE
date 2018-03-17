import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';
import ComponentThree from './components/ComponentThree';
import AllSongs from './components/AllSongs';
import OneSong from './components/OneSong';
import services from './services/apiServices';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      apiDataRecieved: false,
      firRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loggingOut = this.loggingOut.bind(this);
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
  render() {
    if(!this.state.isLoggedIn) {
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="User Name"
            />
            <input
              type="text"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
            <input type="submit" value="Log In!" />
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <div>
              <nav>
                <Link to='/'>Home Link</Link>
                <Link to='/componenttwo'>Link to the Second Page</Link>
                <Link to='/componentthree'>Link to the Third Page</Link>
                <Link to='/songs'>Link to the songs</Link>
                <button onClick={this.loggingOut}>Log Out</button>
              </nav>
              <Route exact path='/' render={() => <ComponentOne userData={this.state.userData} />} />
              <Route path='/componenttwo' component={ComponentTwo} />
              <Route path='/componentthree' component={ComponentThree} />
              <Route exact path='/songs' render={() => <AllSongs userData={this.state.userData} />}/>
              <Route path='/songs/:id' render={() => <OneSong userData={this.state.userData} />}/>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
