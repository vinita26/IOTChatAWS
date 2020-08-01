

import {
  main as attachPublicPublish,
  generatePolicyDocumentTemplate,
} from '../attachPublicPublish';
import * as iot from '../../helpers/aws-iot';
import { CustomError } from '../../helpers/test/errors';

describe('attach public publish policy', () => {
  jest.mock('../../helpers/aws-iot', () => ({
    call: jest.fn(),
  }));

  const identityId = 'us-west-2:identity-id';
  const event = {
    requestContext: {
      identity: {
        cognitoIdentityId: identityId,
      },
    },
  };
  const accountArn = '123456789';
  const context = {
    invokedFunctionArn: 'arn:aws:lambda:us-west-2:123456789:function:chat-app-api-prod-AttachPublicPublishPolicy',
  };

  describe('when iot calls succeed', () => {
    beforeEach(() => {
      const expectedPolicyName = 'PublicPublishPolicy.us-west-2-identity-id';
      iot.createPolicy = (policyDocument, policyName) => (
        new Promise((resolve) => {
          const expectedPolicyDocument = generatePolicyDocumentTemplate(identityId, accountArn);
          expect(policyDocument).toEqual(JSON.stringify(expectedPolicyDocument));
          expect(policyName).toEqual(expectedPolicyName);
          resolve();
        })
      );

      iot.attachPrincipalPolicy = (policyName, principal) => (
        new Promise((resolve) => {
          expect(policyName).toEqual(expectedPolicyName);
          expect(principal).toEqual(identityId);
          resolve();
        })
      );
    });

    it('should should return status true', async () => {
      await attachPublicPublish(
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
      iot.createPolicy = () => (
        new Promise((resolve, reject) => {
          reject(new CustomError(409));
        })
      );
    });

    it('should return status true if policy is already attached', async () => {
      await attachPublicPublish(
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
      iot.createPolicy = () => (
        new Promise((resolve, reject) => {
          reject(new CustomError(500));
        })
      );
    });

    it('should return error', async () => {
      await attachPublicPublish(
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
