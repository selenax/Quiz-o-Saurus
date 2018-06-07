import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
    }
  }

  componentDidMount() {
  }

  updateView(view) {
    this.setState({
      view: view
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'home') {
      return (
        <QuizListComponent /> 
      )
    }
  }

  render () {
    return (
      <div>
        <div className="nav">
          <span className="logo"
            onClick={() => this.updateView('home')}>
          <b>Quiz o' Saurus</b>
          </span>
          <span className={this.state.view === 'home'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.updateView('home')}>
          <b>Home</b>
          </span>
          <span className="nav-unselected"
            onClick={() => this.updateView('leaderboard')}
          >
          <b>Leaderboard</b>
          </span>
          <span className="nav-unselected"
            onClick={() => this.updateView('results')}
          >
          <b>Results</b>
          </span>
        </div>
        <div className="main">
          <div>
            {this.renderView()}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));