

import React from 'react';
import { PropTypes } from 'prop-types';
import SocialLogin from 'react-social-login';
import { Button } from 'semantic-ui-react';

/**
 * UI Component that wraps react-social-login
 */
const SocialButton = ({ children, triggerLogin, ...props }) => (
  <Button
    onClick={triggerLogin}
    {...props}
  >
    { children }
  </Button>
);

SocialButton.defaultProps = {
  children: null,
};

SocialButton.propTypes = {
  children: PropTypes.node,
  triggerLogin: PropTypes.func.isRequired,
};

export default SocialLogin(SocialButton);
