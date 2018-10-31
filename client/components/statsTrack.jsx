import React from 'react';
import Promise from 'bluebird';
import $ from 'jquery';
import Moment from 'moment';

class StatsTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pledged: 0,
      goal: 0,
      backers: 0,
      deadline: '',
      currCode: 'USD',
    };
    this.loadCampaignStats = this.loadCampaignStats.bind(this);
  }

  componentDidMount() {
    this.loadCampaignStats();
  }

  loadCampaignStats() {
    const campaignId = 1 + Math.floor(Math.random() * 100);
    const promise = new Promise((resolve) => {
      $.get(`campaigns/${campaignId}/stats`, (data) => {
        resolve(data);
      });
    });

    promise.then((stats) => {
      this.setState({
        pledged: stats.pledged,
        goal: stats.goal,
        backers: stats.backers,
        deadline: stats.deadline,
        currCode: stats.currency,
      });
    }).catch((err) => {
      throw err;
    });
  }
  render() {
    const { pledged } = this.state;
    const { currCode } = this.state;
    const { goal } = this.state;
    const { deadline } = this.state;
    const { backers } = this.state;

    const pledgeAmount = pledged.toLocaleString(undefined, { style: 'currency', currency: currCode });
    const goalAmount = goal.toLocaleString(undefined, { style: 'currency', currency: currCode });
    const goalLine = `Pledged of ${goalAmount} goal`;
    const backerCount = backers.toLocaleString(undefined);
    let timeLeft = Moment(deadline).diff(Moment(), 'days').toLocaleString(undefined);
    let timeUnits = 'days to go';

    if (timeLeft <= 0) {
      timeLeft = Moment(deadline).diff(Moment(), 'hours', true).toLocaleString(undefined);
      timeUnits = 'hours to go';
    }


    return (
      <div className="funding-tracker">
        <div className="pledged-amount">
          <h3>{pledgeAmount}</h3>
        </div>
        <div className="goal-amount">
          <p>{goalLine}</p>
        </div>
        <div className="backers">
          <h3>{backerCount}</h3>
          <p>backers</p>
        </div>
        <div className="deadline">
          <h3 id="remaining">{timeLeft}</h3>
          <p id="units">{timeUnits}</p>
        </div>
        <button type="button">Back this Campaign</button>
      </div>
    );
  }
}

export default StatsTrack;
