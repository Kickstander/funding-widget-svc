const Promise = require('bluebird');

const db = require('../../db/connection.js');

const statsTrack = () => {
  
  return (
    <div className="funding-tracker">
      <div className="pledged-amount">
      </div>
      <div className="goal-amount">
      </div>
      <div className="backers">
      </div>
      <div className="deadline">
      </div>
    </div>
  );
};

export default statsTrack;
