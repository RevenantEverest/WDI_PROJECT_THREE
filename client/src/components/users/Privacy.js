import React, { Component } from 'react';
import services from "../../services/apiServices";



class Privacy extends Component {
      constructor(props){
        super(props);
        this.state = {
          security: "private",
          fireRedirect: false,
          user_id: parseInt(window.localStorage.user_id, 10),
          username: window.localStorage.username
        }
        this.handleSecurityToggle = this.handleSecurityToggle.bind(this)
      }
      componentDidMount(){
        // console.log(`In privacy component ----> `, this.state, window.localStorage);
        services.getSecurity(this.state.username)
        .then(result => {
          // console.log(`made it back to privacy ------> `, result);
          this.setState({
            security: result.data.data.security
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
        handleSecurityToggle(e){
          e.preventDefault()
          // console.log(`The toggle is being fired!`);
          if(this.state.security === "private"){
            this.setState({security: "public"})
            this.changeSecurity("public")
          } else if (this.state.security === "public"){
            this.setState({ security: "private"})
            this.changeSecurity("private")
          } else {
            console.log(`the if statement is not working!`);
          }

        }

        changeSecurity(cred){
          const userdata = {
            username: this.state.username,
            user_id: this.state.user_id
          }
          services.changeSecurity(userdata, cred)
          // window.location.reload()
          .then(result => {
            console.log(`Set security`, result);
          })
          .catch(err => {
            
          })
        }

      render(){
        return(
          <div>
            {this.state.security === "private" ? <button onClick={this.handleSecurityToggle}>Make Account Public</button> : <button onClick={this.handleSecurityToggle}>Make Account Private</button>}
          </div>
        )
      }

}

export default Privacy;
