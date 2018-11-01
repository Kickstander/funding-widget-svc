import React from 'react';
import Promise from 'bluebird';
import $ from 'jquery';
import Moment from 'moment';
import BackButton from './BackButton';

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
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.loadCampaignStats();
  }

  loadCampaignStats() {
    const campaignId = 1 + Math.floor(Math.random() * 100); // random id 1-100
    const promise = new Promise((resolve) => {
      // ask the server to retrieve campaign data from db
      $.get(`campaigns/${campaignId}/stats`, (data) => {
        resolve(data);
      });
    });

    promise.then((stats) => { // update component state with db data
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

  clickHandler() {
    const newPledge = 1 + Math.floor(Math.Random() * 50);
    const { pledged } = this.state;
    this.setState({ pledged: (pledged + newPledge) });
  }

  render() {
    const { pledged } = this.state;
    const { currCode } = this.state;
    const { goal } = this.state;
    const { deadline } = this.state;
    const { backers } = this.state;

    // format funds as browser locale string with currency symbol/code
    const pledgeAmount = pledged.toLocaleString(undefined, { style: 'currency', currency: currCode });
    // format goal as browser locale string with currency symbol/code
    const goalAmount = goal.toLocaleString(undefined, { style: 'currency', currency: currCode });
    // render text string for amount raised
    const goalLine = `Pledged of ${goalAmount} goal`;
    // format backers numbers according to browser locale
    const backerCount = backers.toLocaleString(undefined);
    // calculate remaining funding time
    let timeLeft = Moment(deadline).diff(Moment(), 'days');
    let timeUnits = 'days to go';

    if (timeLeft <= 0) { // reformat remaining time if less than one day
      timeLeft = Moment(deadline).diff(Moment(), 'hours', true).toLocaleString(undefined);
      timeUnits = 'hours to go';
    }


    return (
      <div className="funding-tracker">
        <div className="pledged-amount">
          <h3>{pledgeAmount}</h3>
        </div>
        <div className="goal-amount">
          <div>{goalLine}</div>
        </div>
        <div className="backers">
          <h3>{backerCount}</h3>
          <div>backers</div>
        </div>
        <div className="deadline">
          <h3 id="remaining">{timeLeft}</h3>
          <div id="units">{timeUnits}</div>
        </div>
        <BackButton clickToBack={clickHandler} />
      </div>
    );
  }
}

export default StatsTrack;
