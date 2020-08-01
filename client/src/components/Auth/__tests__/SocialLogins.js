

import React from 'react';
import { shallow } from 'enzyme';

import { SocialLogins } from '../SocialLogins';

describe('SocialLogin', () => {
  let wrapper;
  const props = {
    loginUserProvider: jest.fn(),
    showFacebook: false,
    showGoogle: false,
    showAmazon: false,
  };

  beforeEach(() => {
    wrapper = shallow(<SocialLogins {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('when social providers are enabled', () => {
    beforeAll(() => {
      props.showFacebook = true;
      props.showGoogle = true;
      props.showAmazon = true;
    });

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });
  });
});
