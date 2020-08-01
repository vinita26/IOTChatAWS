

import { main as create } from '../create';
import * as dynamodb from '../../helpers/dynamodb';

describe('create user', () => {
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
    body: JSON.stringify({
      username,
    }),
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

  const putCallSucceeds = (action, params) => (
    new Promise((resolve) => {
      expect(action).toEqual('put');
      expect(params).toEqual({
        TableName: 'users',
        Item: item,
      });
      resolve();
    })
  );

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

  describe('creating new user', () => {
    beforeEach(() => {
      dynamodb.call = jest.fn()
        .mockImplementationOnce(putCallSucceeds)
        .mockImplementationOnce(getCallReturnsValue);
    });

    it('should return result', async () => {
      await create(
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
      await create(
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
