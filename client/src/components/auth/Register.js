import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Register extends Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    // console.log(this.props);
  }
    // preventDefault and lift state back up to the parent
    handleSubmit(e) {
      e.preventDefault();
      // console.log(`in state ----> `, this.state, this.props);
      this.props.submit(this.state);

    }

    // update form state
    handleChange(e) {
      const { name, value } = e.target
      this.setState({
        [name]: value,
      });
      // console.log(name,value)
    }

    render() {
      // console.log('loaded', this.state)
      return (
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.username} />
          </label>
          <label>Password
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password} />
          </label>
          <button type="submit" value="Submit">Submit</button>
        </form>
      );
    }
  }
