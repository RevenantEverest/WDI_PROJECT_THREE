import React, {Component} from 'react';
import services from '../../services/apiServices';
import {Redirect} from 'react-router-dom'


//This component is the form to add a playlist to the user's profile

// ****** THERE WILL BE PARTS THAT CHANGE HERE DUE TO USER AUTH ******

class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {

      //****** SEE CHANGES ******

      username: window.localStorage.username,
      user_id: window.localStorage.user_id,

      // userData: this.props.userData,

      fireRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Delete this componentDidMount method

  componentDidMount(){
    console.log('AddPlaylist =>' + this.props);
  }
  
  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const data = {

      //****** UPDATE PLEASE ********

      username: this.state.username,
      userId: this.state.user_id,

      // username: this.state.userData.username,
      // userId: this.state.userData.user_id,


      playlist_name: this.state.playlist_name
    }

    //direct to apiServices to add the information to the appropriate user playlist

    services.addPlaylist(data)
    .then(result => {
      console.log(`Inserted new Playlist ----> `, result);
      this.setState({
        fireRedirect: true
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="addPlaylist">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="playlist_name" onChange={this.handleChange} placeholder="playlist name" />
          <input type="submit" value="Add!" />
        </form>

        {/* ****** UPDATE PLEASE ******** */}

        {this.state.fireRedirect ? window.location.reload() : ''}

        {/* {this.state.fireRedirect ? <Redirect to='/' /> : ''} */}


      </div>
    )
  }

}
export default AddPlaylist;
