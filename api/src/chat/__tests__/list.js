

import { main as list } from '../list';
import * as dynamodb from '../../helpers/dynamodb';

describe('list chats', () => {
  jest.mock('../../helpers/dynamodb', () => ({
    call: jest.fn(),
  }));

  const item = {
    admin: 'identity-id',
    createdAt: 1508877096991,
    name: 'room/public/room1',
    type: 'public',
  };

  describe('when dynamo call succeeds', () => {
    beforeEach(() => {
      dynamodb.call = (action, params) => (
        new Promise((resolve) => {
          expect(action).toEqual('scan');
          expect(params).toEqual({
            TableName: 'chats',
          });
          resolve({ Items: [item] });
        })
      );
    });

    it('should return results', async () => {
      const event = {};
      const context = {};

      await list(
        event,
        context,
        (error, result) => {
          expect(error).toBeFalsy();
          const body = JSON.parse(result.body);
          expect(body).toEqual([item]);
          expect(result.statusCode).toEqual(200);
        },
      );
    });
  });

  describe('when dynamo call fails', () => {
    const errorMsg = 'dynamodb error';
    beforeEach(() => {
      dynamodb.call = () => (
        new Promise((resolve, reject) => {
          reject(errorMsg);
        })
      );
    });

    it('should return an error', async () => {
      const event = {};
      const context = {};

      await list(
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
