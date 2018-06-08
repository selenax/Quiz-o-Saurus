import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import QuizListComponent from './components/Home/QuizListComponent.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
    }
    this.viewUpdate = this.viewUpdate.bind(this)
  }

  componentDidMount() {
  }

  viewUpdate(state) {
    this.setState({ view: state });
  }

  render () {
    return (
      <div className="nav">
        <ul>
          <li className="logo">Quiz o' Saurus</li>
          <li className="nav-ui"
            onClick={this.viewUpdate.bind('home')}>
            <a>Home</a>
          </li>
          <li className="nav-ui"
            onClick={this.viewUpdate.bind('leaderboard')}>
            <a>Leaderboard</a>
          </li>
          <li className="nav-ui" 
            onClick={this.viewUpdate.bind('result')}>
            <a>Result</a>
          </li>
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));