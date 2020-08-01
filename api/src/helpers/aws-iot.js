

import AWS from 'aws-sdk';

export const attachPrincipalPolicy = (policyName, principal) => {
  const iot = new AWS.Iot();
  const params = { policyName, principal };
  return iot.attachPrincipalPolicy(params).promise();
};

export const createPolicy = (policyDocument, policyName) => {
  const iot = new AWS.Iot();
  const params = { policyDocument, policyName };
  return iot.createPolicy(params).promise();
};
