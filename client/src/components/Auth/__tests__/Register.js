

import React from 'react';
import { shallow } from 'enzyme';

import { Register } from '../Register';

describe('Register', () => {
  let wrapper;

  const props = {
    register: jest.fn(),
    authFormUpdate: jest.fn(),
    username: 'username',
    password: 'password',
    email: 'email@test.com',
    notice: '',
    error: '',
    loading: false,
  };

  beforeEach(() => {
    wrapper = shallow(<Register {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
