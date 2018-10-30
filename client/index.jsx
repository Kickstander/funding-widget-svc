import React from 'react';
import ReactDOM from 'react-dom';
import statsTrack from './components/statsTrack';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello
        <statsTrack />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
