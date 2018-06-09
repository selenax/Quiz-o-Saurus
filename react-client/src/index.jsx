import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import QuizListComponent from "./components/Home/QuizListComponent.jsx";
import Leaderboard from "./components/LeaderboardComponents/Leaderboard.jsx";
import Root from "./components/Root/Root.jsx";
import Dinosauar from "../../database-mongo/exampleData.js";
import UserData from "./UserExampleData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "root"
    };
    this.viewUpdate = this.viewUpdate.bind(this);
  }

  //change the view of our website
  viewUpdate(newView) {
    this.setState({
      view: newView
    });
  }

  //load different components depending on the website
  currentPage() {
    if(this.state.view === "root") {
      return <Root />
    } else if (this.state.view === "home") {
      console.log("hello");
      return <QuizListComponent quizData={Dinosauar} />;
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
