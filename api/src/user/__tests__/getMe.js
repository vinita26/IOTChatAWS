

import {
  main as getMe,
  USER_NOT_FOUND,
} from '../getMe';
import * as dynamodb from '../../helpers/dynamodb';

describe('get me', () => {
  jest.mock('../../helpers/dynamodb', () => ({
    call: jest.fn(),
  }));

  const identityId = 'us-west-2:identity-id';
  const now = new Date();
  const username = 'username';
  const item = { identityId, createdAt: now.getTime(), username };

  const event = {
    requestContext: {
      identity: {
        cognitoIdentityId: identityId,
      },
    },
  };
  const context = {};
  let _Date;

  beforeAll(() => {
    _Date = Date;
    global.Date = jest.fn(() => now);
  });

  afterAll(() => {
    global.Date = _Date;
  });

  const getCallReturnsValue = (action, params) => (
    new Promise((resolve) => {
      expect(action).toEqual('get');
      expect(params).toEqual({
        TableName: 'users',
        Key: {
          identityId,
        },
      });
      resolve({ Item: item });
    })
  );

  const getCallDoesNotReturnValue = (action, params) => (
    new Promise((resolve) => {
      expect(action).toEqual('get');
      expect(params).toEqual({
        TableName: 'users',
        Key: {
          identityId,
        },
      });
      resolve({});
    })
  );

  describe('when fetching a user succeeds', () => {
    beforeEach(() => {
      dynamodb.call = jest.fn()
        .mockImplementationOnce(getCallReturnsValue);
    });

    it('should return result', async () => {
      await getMe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body).toEqual(item);
          expect(result.statusCode).toEqual(200);
        },
      );
    });
  });

  describe('when user does not exist', () => {
    beforeEach(() => {
      dynamodb.call = jest.fn()
        .mockImplementationOnce(getCallDoesNotReturnValue);
    });

    it('should return result', async () => {
      await getMe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body.error).toEqual(USER_NOT_FOUND);
          expect(result.statusCode).toEqual(404);
        },
      );
    });
  });

  describe('when a dynamo call fails', () => {
    const errorMsg = 'dynamodb error';
    beforeEach(() => {
      dynamodb.call = () => (
        new Promise((resolve, reject) => {
          reject(errorMsg);
        })
      );
    });

    it('should return an error', async () => {
      await getMe(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body.error).toEqual(errorMsg);
          expect(body.status).toEqual(false);
          expect(result.statusCode).toEqual(500);
        },
      );
    });
  });
});
