

import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';
import * as IoT from '../../lib/aws-iot';

describe('App', () => {
  IoT.attachConnectHandler = jest.fn();
  IoT.attachCloseHandler = jest.fn();
  IoT.publish = jest.fn();

  const props = {
    connectPolicy: true,
    publicPublishPolicy: true,
    publicSubscribePolicy: true,
    publicReceivePolicy: true,
    loggedIn: false,
    handleSignOut: jest.fn(),
    loggedInStatusChanged: jest.fn(),
    acquirePublicPolicies: jest.fn(),
    deviceConnected: false,
    deviceConnectedStatusChanged: jest.fn(),
    identityId: 'identity-id',
    attachMessageHandler: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
  });

  describe('when logged in', () => {
    beforeAll(() => {
      props.loggedIn = true;
      sessionStorage.setItem('isLoggedIn', true);
    });

    describe('when public policies have been granted', () => {
      it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
      });
    });

    describe('when public policies have not been granted', () => {
      beforeAll(() => {
        props.connectPolicy = false;
      });

      it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
      });
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
