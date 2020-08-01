

import * as dynamodb from '../helpers/dynamodb';
import { success, failure, notFound } from '../helpers/response';

export const USER_NOT_FOUND = 'User not found.';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'IotChatUsers',
    Key: {
      identityId: event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamodb.call('get', params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, notFound({ status: false, error: USER_NOT_FOUND }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
};
