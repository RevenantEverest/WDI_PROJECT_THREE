import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import services from '../services/apiServices'

class UserAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      firRedirect: false,
    }
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
    services.makeUser(this.state)
    .then(result => {
      console.log(result);
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
      return(
        <div>
          <h1>Create a new Profile</h1>
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
            <div>
              {this.state.fireRedirect ? <Redirect to='/' /> : ''}
            </div>
        </div>
      )
    }
}

export default UserAdd
