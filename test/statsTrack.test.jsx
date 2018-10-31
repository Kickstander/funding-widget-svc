import React from 'react';
import { shallow } from 'enzyme';
import Moment from 'moment';
import StatsTrack from '../client/components/statsTrack';

test('Remaining time is read out in days if 1 or more days left', () => {
  const statTracker = shallow(<StatsTrack />);
  if (Moment(statTracker.deadline).diff(Moment(), 'days') > 0) {
    expect(statTracker.find('#units').text).toEqual('days to go');
  } else {
    expect(statTracker.find('#units').text).toEqual('hours to go');
  }
});
// fix testing
