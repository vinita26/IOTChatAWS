
import * as dynamodb from '../helpers/dynamodb';
import { success, failure } from '../helpers/response';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'IotChatUsers',
  };

  try {
    const result = await dynamodb.call('scan', params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
};
