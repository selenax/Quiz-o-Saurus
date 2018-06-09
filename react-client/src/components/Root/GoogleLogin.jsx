import React, { Component } from "react";
import { Button, Icon, Row, Input } from "react-materialize";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

class GoogleLogin extends React.Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
  };

  googleResponse = e => {};
  onFailure = error => {
    alert(error);
  };

  fetchUser() {
    axios.get("/home/currentUser").then(({ user: user }) => {
      this.setState({
        isAuthenticated: true
      });
    });
  }
  googleOnClick() {
    this.fetchUser();
  }
  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId="XXXXXXXXXX"
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        />
      </div>
    );
    return <div className="GoogleLogin">{content}</div>;
  }
}

export default GoogleLogin;
