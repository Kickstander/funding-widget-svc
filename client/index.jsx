import React from 'react';
import ReactDOM from 'react-dom';
import StatsTrack from './components/statsTrack';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <StatsTrack />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
