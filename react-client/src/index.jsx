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
            onClick={() => this.changeView('home')}>
          <b>Home</b>
          </span>
          <span className="nav-unselected"
            onClick={() => this.changeView('leaderboard')}
          >
          <b>Leaderboard</b>
          </span>
          <span className="nav-unselected"
            onClick={() => this.changeView('results')}
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