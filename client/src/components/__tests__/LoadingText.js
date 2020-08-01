

import React from 'react';
import { shallow } from 'enzyme';

import LoadingText from '../LoadingText';

describe('LoadingText', () => {
  const props = {
    children: 'child nodes',
    verbPresent: 'connecting',
    verbPast: 'connected',
    condition: false,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadingText {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
