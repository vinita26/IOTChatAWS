
import * as dynamodb from '../helpers/dynamodb';
import { success, failure } from '../helpers/response';

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const tableName = 'IotChatUsers';
  const identityId = event.requestContext.identity.cognitoIdentityId;

  const params = {
    TableName: tableName,
    Item: {
      identityId,
      username: data.username,
      createdAt: new Date().getTime(),
    },
  };

  const queryParams = {
    TableName: tableName,
    Key: {
      identityId,
    },
  };

  try {
    await dynamodb.call('put', params);
    const result = await dynamodb.call('get', queryParams);
    callback(null, success(result.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
};
