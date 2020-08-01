

import * as iot from '../helpers/aws-iot';
import { success, failure } from '../helpers/response';

export const generatePolicyDocumentTemplate = (identityId, accountArn) => ({
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Action: [
        'iot:Publish',
      ],
      Resource: [
        `arn:aws:iot:${process.env.AWS_REGION}:${accountArn}:topic/room/public/*/${identityId}`,
      ],
    },
  ],
});

/**
 * Attach a policy to the Cognito Identity to allow it to publish to any public room
 * The client can only publish to their unique topic that ends with their Cognito Identity Id:
 * /room/public/+/${identity}.
 * This is so that when receiving a message, another client can parse the mqtt message topic to
 * determine who sent the message
 */
export const main = async (event, context, callback) => {
  const cognitoIdentity = event.requestContext.identity.cognitoIdentityId;

  // Policy Name regex does not support ':'. Replace with '-'.
  const policyName = `IotChatPublicPublishPolicy.${cognitoIdentity.split(':').join('-')}`;
  const principal = cognitoIdentity;

  const accountArn = context.invokedFunctionArn.split(':')[4];

  const policyDocument = generatePolicyDocumentTemplate(principal, accountArn);

  try {
    await iot.createPolicy(JSON.stringify(policyDocument), policyName);
    await iot.attachPrincipalPolicy(policyName, principal);
    callback(null, success({ status: true }));
  } catch (e) {
    if (e.statusCode === 409) {
      // Policy already exists for this cognito identity
      callback(null, success({ status: true }));
    } else {
      console.log(e);
      callback(null, failure({ status: false, error: e }));
    }
  }
};
