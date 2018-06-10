import React, { Component } from "react";
import { Button, Icon, Row, Input } from "react-materialize";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// import token from "./configs.js";
// console.log(token);

export default class Googlelogin extends React.Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  logout() {
    this.setState({ isAuthenticated: false, token: "", user: null });
  }

  onFailure(error) {
    alert(error);
  }

  googleResponse(response) {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:3000/auth/google", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  }

  render() {
    return !!this.state.isAuthenticated ? (
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
          clientId='742940875432-d88m20e2l2110l3m3jd24ag46v2a3pbm.apps.googleusercontent.com'
          img width="20px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          buttonText="Click here for Google Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        />
      </div>
    );
  }
}


   