

import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  const props = {
    connectPolicy: true,
    publicPublishPolicy: false,
    publicSubscribePolicy: true,
    publicReceivePolicy: false,
    deviceConnected: true,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Spinner {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
