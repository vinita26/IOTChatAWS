

import React from 'react';
import { shallow } from 'enzyme';

import { RoomMenu } from '../RoomMenu';

describe('RoomMenu', () => {
  const props = {
    subscribedTopics: [
      'room/public/room1/+',
      'room/public/room2/+',
    ],
    match: {
      params: {
        roomType: 'public',
        roomName: 'room1',
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RoomMenu {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
