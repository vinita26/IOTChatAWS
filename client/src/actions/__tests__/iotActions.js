

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../iotActions';
import * as types from '../types';
import * as IoT from '../../lib/aws-iot';
import * as ApiGateway from '../../lib/api-gateway';
import * as Cognito from '../../lib/aws-cognito';
import * as authActions from '../authActions';

describe('IoT Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe('acquirePublicPolicies', () => {
    const connectCallback = jest.fn();
    const closeCallback = jest.fn();

    describe('when logged in', () => {
      const identityId = 'idenitity-id';

      beforeEach(() => {
        Cognito.authUser = () => Promise.resolve(true);
        Cognito.getIdentityId = () => identityId;
        IoT.initNewClient = jest.fn();
        IoT.attachConnectHandler = jest.fn();
        IoT.attachCloseHandler = jest.fn();
        ApiGateway.attachConnectPolicy = () => Promise.resolve();
        ApiGateway.attachPublicPublishPolicy = () => Promise.resolve();
        ApiGateway.attachPublicSubscribePolicy = () => Promise.resolve();
        ApiGateway.attachPublicReceivePolicy = () => Promise.resolve();
      });

      it('should dispatch appropriate policy actions', () => {
        const expectedActions = [
          { type: types.IDENTITY_UPDATED, identityId },
          { type: types.CONNECT_POLICY_ATTACHED },
          { type: types.PUBLIC_PUBLISH_POLICY_ATTACHED },
          { type: types.PUBLIC_SUBSCRIBE_POLICY_ATTACHED },
          { type: types.PUBLIC_RECEIVE_POLICY_ATTACHED },
        ];

        const store = mockStore({
          iot: {
            connectPolicy: false,
            publicPublishPolicy: false,
            publicSubscribePolicy: false,
            publicReceivePolicy: false,
          },
        });
        return store.dispatch(actions.acquirePublicPolicies(connectCallback, closeCallback))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('when not logged in', () => {
      beforeEach(() => {
        Cognito.authUser = () => Promise.resolve(false);
        authActions.handleSignOut = () => jest.fn();
      });

      it('should log out the user', () => {
        const expectedActions = [];

        const store = mockStore({
          iot: {
            connectPolicy: false,
            publicPublishPolicy: false,
            publicSubscribePolicy: false,
            publicReceivePolicy: false,
          },
        });

        return store.dispatch(actions.acquirePublicPolicies(connectCallback, closeCallback))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('attachMessageHandler', () => {
    beforeEach(() => {
      IoT.attachMessageHandler = jest.fn();
    });


    it('should dispatch attached handler action', () => {
      const expectedActions = [
        { type: types.MESSAGE_HANDLER_ATTACHED, attached: true },
      ];

      const store = mockStore({
        iot: {
          messageHandlerAttached: false,
        },
      });

      return store.dispatch(actions.attachMessageHandler()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
