

import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../Login';

describe('Login', () => {
  let wrapper;

  const props = {
    authFormUpdate: jest.fn(),
    username: 'username',
    password: 'password',
    loginUser: jest.fn(),
    notice: '',
    error: '',
    loading: false,
    loggedInStatusChanged: jest.fn(),
    loggedIn: false,
    location: {},
  };

  beforeEach(() => {
    wrapper = shallow(<Login {...props} />);
  });

  describe('when logged in', () => {
    beforeAll(() => {
      props.loggedIn = true;
      sessionStorage.setItem('isLoggedIn', true);
    });

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });
  });

  describe('when logged out', () => {
    beforeAll(() => {
      props.loggedIn = false;
      sessionStorage.setItem('isLoggedIn', false);
    });

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });
  });
});
