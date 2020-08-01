
import React from 'react';
import { shallow } from 'enzyme';

import { Chat } from '../Chat';

describe('Chat', () => {
  const props = {
    subscribeToTopic: jest.fn(),
    match: {
      params: {
        roomType: 'public',
        roomName: 'room1',
      },
    },
    messages: [],
    readChat: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Chat {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
