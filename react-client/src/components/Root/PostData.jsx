import React, { Component } from "react";
import { Button, Icon, Row, Input } from "react-materialize";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// import token from "./configs.js";
// console.log(token);

export function PostData(type, userData) {
  let BaseURL = '/auth/google';

  return new Promise((resolve, reject) =>{
  fetch({BaseURL}, {
      method: 'POST',
      body: JSON.stringify(userData)
  })
  .then((response) => response.json())
  .then((res) => {
      resolve(res);
  })
  .catch((error) => {
     reject(error);
  });
  
  });
  }