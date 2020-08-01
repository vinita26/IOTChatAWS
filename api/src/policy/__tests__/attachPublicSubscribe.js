

import {
  main as attachPublicSubscribe,
  POLICY_NAME,
} from '../attachPublicSubscribe';
import * as iot from '../../helpers/aws-iot';
import { CustomError } from '../../helpers/test/errors';

describe('attach public subscribe policy', () => {
  jest.mock('../../helpers/aws-iot', () => ({}));

  const identityId = 'us-west-2:identity-id';
  const event = {
    requestContext: {
      identity: {
        cognitoIdentityId: identityId,
      },
    },
  };
  const context = {};

  describe('when iot call succeeds', () => {
    beforeEach(() => {
      iot.attachPrincipalPolicy = (policyName, principal) => (
        new Promise((resolve) => {
          expect(policyName).toEqual(POLICY_NAME);
          expect(principal).toEqual(identityId);
          resolve();
        })
      );
    });

    it('should should return status true', async () => {
      await attachPublicSubscribe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body).toEqual({ status: true });
          expect(result.statusCode).toEqual(200);
        },
      );
    });
  });

  describe('when policy is already attached', () => {
    beforeEach(() => {
      iot.attachPrincipalPolicy = () => (
        new Promise((resolve, reject) => {
          reject(new CustomError(409));
        })
      );
    });

    it('should return status true if policy is already attached', async () => {
      await attachPublicSubscribe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body).toEqual({ status: true });
          expect(result.statusCode).toEqual(200);
        },
      );
    });
  });

  describe('when attaching policy fails and not a 409', () => {
    beforeEach(() => {
      iot.attachPrincipalPolicy = () => (
        new Promise((resolve, reject) => {
          reject(new CustomError(500));
        })
      );
    });

    it('should return error', async () => {
      await attachPublicSubscribe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body.status).toEqual(false);
          expect(result.statusCode).toEqual(500);
        },
      );
    });
  });
});
