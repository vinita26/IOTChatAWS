

import React from 'react';
import { shallow } from 'enzyme';

import { LoadingUserComment } from '../LoadingUserComment';

describe('LoadingUserComment', () => {
  const props = {
    fetchingUser: false,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadingUserComment {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
