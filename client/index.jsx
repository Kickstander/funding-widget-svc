import React from 'react';
import ReactDOM from 'react-dom';
import StatsTrack from './components/statsTrack';
import style from './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={style.app}>
        <StatsTrack />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('funding-widget'));

export default App;
