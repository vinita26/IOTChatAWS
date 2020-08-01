

import * as iot from '../helpers/aws-iot';
import { success, failure } from '../helpers/response';

export const POLICY_NAME = 'IotChatPublicSubscribePolicy';

/**
 * Attach a policy to the Cognito Identity to allow it to subscribe to all public rooms
 */
export const main = async (event, context, callback) => {
  const principal = event.requestContext.identity.cognitoIdentityId;

  try {
    await iot.attachPrincipalPolicy(POLICY_NAME, principal);
    callback(null, success({ status: true }));
  } catch (e) {
      console.log(e);
      callback(null, failure({ status: false, error: e }));
  }
};
