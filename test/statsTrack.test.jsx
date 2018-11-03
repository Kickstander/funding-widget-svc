import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import StatsTrack from '../client/components/statsTrack';
import ProgressBar from '../client/components/ProgressBar';

it('renders correctly', () => {
  // const mockFill = 32;
  // const mockGoal = 64;
  const tree = renderer.create(<ProgressBar fill={32} goal={64} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Time remaining on campaign', () => {
  test('Remaining time is read out in days if 1 or more days are left', () => {
    const statTracker = shallow(<StatsTrack />);
    statTracker.setState({ deadline: '2019-11-08' });
    expect(statTracker.find('.units').text()).toEqual('days to go');
  });

  test('Remaining time is read out in hours if less than 1 day is left', () => {
    const statTracker = shallow(<StatsTrack />);
    statTracker.setState({ deadline: '2018-11-01' });
    expect(statTracker.find('.units').text()).toEqual('hours to go');
  });
});
