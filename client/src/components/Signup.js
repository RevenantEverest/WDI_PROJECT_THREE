import React, { Component } from 'react';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: "",
      password: ''
    }
  }

    handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      username: '',
      password: ''

    })
  }

    handleFormSubmit(e) {
    e.preventDefault();
    .then( user => {
      this.setState({
        fireRedirect: true
      })
      console.log(user)
    })
    .catch(err => {
      console.log(err)
    })
}


  render() {
    return(
      <div className='signup-form'>
      <form onSubmit={this.handleFormSubmit}>
      <input type='text' name='user' onChange={this.handleInputChange}
      placeholder='User Name?' />
      <input type='text' name='password' onChange={this.handleInputChange} />
      </form>
      </div>
    )
  }
}



export default Signup;
