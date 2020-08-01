

import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'semantic-ui-react';

import { Reply } from '../Reply';
import * as IoT from '../../../lib/aws-iot';

describe('Reply', () => {
  IoT.publish = jest.fn();

  let wrapper;

  const props = {
    messageToSend: 'msg',
    messageToSendChanged: jest.fn(),
    identityId: 'identityId',
    match: {
      params: {
        roomType: 'public',
        roomName: 'test',
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Reply {...props} />);
  });

  it('publishes messages to my_awesome_topic', () => {
    wrapper.find(Form).simulate('submit');
    expect(IoT.publish).toHaveBeenCalledWith('room/public/test/identityId', '{"message":"msg"}');
  });
});
