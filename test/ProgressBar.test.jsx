import React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '../client/components/ProgressBar';

describe('Progress bar', () => {
  test('Value is rendered correctly', () => {
    const tree = renderer.create(<ProgressBar fill={32} goal={64} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
