import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import QuizListComponent from "./components/Home/QuizListComponent.jsx";
import Leaderboard from "./components/LeaderboardComponents/Leaderboard.jsx";

import Dinosaur from "../../database-mongo/exampleData.js";
import UserData from "./UserExampleData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "home",
      quizzes: []
    };
    this.viewUpdate = this.viewUpdate.bind(this);
  }

  //change the view of our website
  viewUpdate(newView) {
    this.setState({
      view: newView
    });
  }

  //ajax fetch our list of quizzes from the server
  ajaxQuizFetch(cb) {
    $.ajax({
      url: '/data/quizzes',
      method: 'GET',
      success: (data) => {
        cb(data);
      },
      err: (err) => {
        console.log('could not fetch', err);
      }
    })
  }

  //set the data of our quizzes from the server
  quizFetch() {
    this.ajaxQuizFetch((data) => this.setState({quizzes: data}))
  } 

  //load different components depending on the website
  currentPage() {
    if (this.state.view === "home") {
      console.log("hello");
      return <QuizListComponent quizData={Dinosaur} />;
    } else if (this.state.view === "leaderboard") {
      return <Leaderboard data={UserData} />;
    }
  }

  //render our nav bar
  render () {
    return (
      <div className="nav">
        <ul>
          <li className="logo">Quiz o' Saurus</li>
          <li
            className="nav-ui"
            onClick={() => {
              this.viewUpdate("home");
            }}
          >
            <a>Home</a>
          </li>
          <li
            className="nav-ui"
            onClick={() => {
              this.viewUpdate("leaderboard");
            }}
          >
            <a>Leaderboard</a>
          </li>
          <li
            className="nav-ui"
            onClick={() => {
              this.viewUpdate("result");
            }}
          >
            <a>Result</a>
          </li>
        </ul>
        <div>
          <div className="pageRender">{this.currentPage()}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
