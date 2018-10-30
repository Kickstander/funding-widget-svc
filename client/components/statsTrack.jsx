import Promise from 'bluebird';
import Request from 'request';
import React from 'react';


const statsTrack = () => {
  const campaignId = 1 + Math.floor(Math.random() * 100);
  const getRequest = new Promise((resolve, reject) => {
    Request.get(`/campaigns/${campaignId}/stats/`, (error, reponse, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
  getRequest.then(stats => (
    <div className="funding-tracker">
      <div className="pledged-amount">
        {stats.pledged}
      </div>
      <div className="goal-amount">
        {stats.goal}
      </div>
      <div className="backers">
        {stats.backers}
      </div>
      <div className="deadline">
        {stats.backers}
      </div>
    </div>));
};

export default statsTrack;
