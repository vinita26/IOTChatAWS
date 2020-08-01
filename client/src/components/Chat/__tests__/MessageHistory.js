

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import uuid from 'uuid/v4';

import { MessageHistory, mapStateToProps } from '../MessageHistory';
import Message from '../Message';

describe('MessageHistory', () => {
  const props = {
    messages: [
      { id: uuid(), author: 'bob', time: moment(), text: 'msg1' },
      { id: uuid(), author: 'sally', time: moment(), text: 'msg2' },
    ],
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MessageHistory {...props} />);
  });

  it('renders a <Message> for each message', () => {
    expect(wrapper.dive().find(Message)).toHaveLength(2);
  });

  describe('mapStateToProps', () => {
    const ownProps = {
      match: {
        params: {
          roomType: 'public',
          roomName: 'room1',
        },
      },
    };

    const message = {
      author: 'bob',
      text: 'message body',
    };

    const state = {
      rooms: {
        'room/public/room1': {
          messages: [message],
        },
      },
    };

    expect(mapStateToProps(state, ownProps)).toEqual({ messages: [message] });
  });
});
