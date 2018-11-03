import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import StatsTrack from '../client/components/statsTrack';
import ProgressBar from '../client/components/ProgressBar';
import BackButton from '../client/components/BackButton';

describe('Progress bar', () => {
  test('Value is rendered correctly', () => {
    const tree = renderer.create(<ProgressBar fill={32} goal={64} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
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

describe('<StatsTrack />', () => {
  it('renders a ProgressBar', () => {
    const track = shallow(<StatsTrack />);
    expect(track.find('ProgressBar')).toHaveLength(1);
  });

  it('renders a \'Back this Campaign\' button', () => {
    const track = shallow(<StatsTrack />);
    expect(track.find('BackButton')).toHaveLength(1);
  });

  it('renders a deadline readout', () => {
    const track = shallow(<StatsTrack />);
    expect(track.find('.deadline')).toHaveLength(1);
  });

  it('renders a pledged amount readout', () => {
    const track = shallow(<StatsTrack />);
    expect(track.find('.pledgedAmount')).toHaveLength(1);
  });
});
