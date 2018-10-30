import React from 'react';
import Promise from 'bluebird';
import $ from 'jquery';


class statsTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      pledged: 0,
      goal: 0,
      backers: 0,
      deadline: '',
    };
  }

  componentDidMount() {
    const campaignId = 1 + Math.floor(Math.random() * 100);
    console.log(campaignId);
    const promise = new Promise((resolve) => {
      $.get(`campaigns/${campaignId}/stats`, (data) => {
        console.log(`Ajax result: ${data}`);
        resolve(data);
      });
    });

    promise.then((stats) => {
      console.log(stats);
      this.setState({
        pledged: stats.pledged,
        goal: stats.goal,
        backers: stats.backers,
        deadline: stats.deadline,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { pledged } = this.state;
    const { goal } = this.state;
    const { backers } = this.state;
    const { deadline } = this.state;
    console.log(`${pledged} ${goal} ${backers} ${deadline}`);
    return (
      <div className="funding-tracker">
        <div className="pledged-amount">
          Pledge Amount {pledged}
        </div>
        <div className="goal-amount">
          Intended Goal {goal}
        </div>
        <div className="backers">
          Backers {backers}
        </div>
        <div className="deadline">
          Deadline {deadline}
        </div>
      </div>
    );
  }
}

export default statsTrack;
