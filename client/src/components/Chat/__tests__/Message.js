
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Message from '../Message';

describe('Message', () => {
  const message = { id: 0, author: 'bob', time: moment(), text: 'msg1' };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Message {...message} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
