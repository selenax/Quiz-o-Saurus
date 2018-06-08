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

  viewUpdate(newView) {
    this.setState({
      view: newView
    }) 
  }

  currentPage() {
    const {state} = this.state.view;
    if (state === 'home') {
      return (
        <QuizListComponent />
      );
    }
  }

  render () {
    return (
      <div className="nav">
        <ul>
          <li className="logo">Quiz o' Saurus</li>
            <li className="nav-ui"
              onClick={() => {this.viewUpdate('home')}}>
              <a>Home</a>
            </li>
            <li className="nav-ui"
              onClick={() => {this.viewUpdate('leaderboard')}}>
              <a>Leaderboard</a>
            </li>
            <li className="nav-ui" 
              onClick={() => {this.viewUpdate('result')}}>
              <a>Result</a>
            </li>
        </ul>
        <div>
          <div className="pageRender">
            {this.currentPage()}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));