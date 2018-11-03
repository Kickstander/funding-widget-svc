import React from 'react';
import { shallow } from 'enzyme';
import StatsTrack from '../client/components/statsTrack';

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

  it('renders a backers readout', () => {
    const track = shallow(<StatsTrack />);
    expect(track.find('.backerCount')).toHaveLength(1);
  });

  it('displays updated stats when a new pledge is made', () => {
    const track = shallow(<StatsTrack />);
    track.setState({
      backers: 18,
      pledged: 15876,
    });
    const oldBackers = track.find('div.backerCount').text();
    const oldPledged = track.find('div.pledgedAmount').text();
    track.setState({
      backers: 32,
      pledged: 18745,
    });
    expect(track.find('div.backerCount').text()).not.toEqual(oldBackers);
    expect(track.find('div.pledgedAmount').text()).not.toEqual(oldPledged);
  });
});
