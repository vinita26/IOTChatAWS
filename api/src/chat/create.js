import * as dynamodb from '../helpers/dynamodb';
import { success, failure, badRequest } from '../helpers/response';

export const INVALID_ROOM_TYPE = 'Room type must be "private" or "public"';
export const INVALID_PUBLIC_ROOM = 'Public room name must obey /^room/public/[a-zA-Z-1-9]+/';
export const INVALID_PRIVATE_ROOM = 'Private room name must obey /^room/private/[a-zA-Z-1-9]+/';
export const CHAT_ALREADY_EXISTS = 'Chat already exists.';

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const tableName = 'IotChatChats';
  const identityId = event.requestContext.identity.cognitoIdentityId;
  const { type, roomName } = data;

  if (!/^(public|private)$/.test(type)) {
    callback(null, badRequest({ status: false, error: INVALID_ROOM_TYPE }));
    return;
  }

  if (type === 'public' && !/^room\/public\/[a-zA-Z-1-9]+$/.test(roomName)) {
    callback(null, badRequest({ status: false, error: INVALID_PUBLIC_ROOM }));
    return;
  }

  if (type === 'private' && !/^room\/private\/[a-zA-Z-1-9]+$/.test(roomName)) {
    callback(null, badRequest({ status: false, error: INVALID_PRIVATE_ROOM }));
    return;
  }

  const params = {
    TableName: tableName,
    Item: {
      admin: identityId,
      name: roomName,
      type,
      createdAt: new Date().getTime(),
    },
  };

  const queryParams = {
    TableName: tableName,
    Key: {
      name: roomName,
    },
  };

  try {
    const oldItem = await dynamodb.call('get', queryParams);
    if (oldItem.Item) {
      callback(null, badRequest({ status: false, error: CHAT_ALREADY_EXISTS }));
      return;
    }
    await dynamodb.call('put', params);
    const result = await dynamodb.call('get', queryParams);
    callback(null, success(result.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
};
