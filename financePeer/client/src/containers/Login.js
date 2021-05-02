import React, { Component } from "react";
import api from '../api'

class Login extends Component {

    constructor(props){
      super(props);
      this.state = {
        email: "",
        password: ""
      };
    }

    handleChange = e => {
      // Here, e is the event.
      // e.target is our element.
      // All we need to do is to update the current state with the values here.
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    handleSubmit = async(e) => {
        // Here, e is the event.
        // default action of submitting the form and reloading the page is prevented. 
        e.preventDefault();

        const { email, password } = this.state;
        api.validateUser(email, password, (res, err) => {
          if(err) {
            this.setState({ Error: res.response.data.error });
            alert(this.state.Error);
          }
          else {
            if (res.status === 200) {
              // console.log(res.data);
              this.setState({ Response: res.data }, async () => {
                // Check if local storage is supported.
                if (typeof Storage !== "undefined") {
                  await localStorage.setItem("JWT", res.data.JWT);
                }

                // Once we get the data, let us decode the data.
                api.DecodeJWT(this.state.Response.JWT, data =>{
                    // console.log(data.data);
                    this.setState({ Data: data.data });
                });
 
                while( localStorage.getItem("JWT") === null ){
                  await this.sleep(100);
                }

                window.location.reload(); 
 
              });

            }
          }
        });
        

    };  
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}> 
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.handleChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}


export default Login

