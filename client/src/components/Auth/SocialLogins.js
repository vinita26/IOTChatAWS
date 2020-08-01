/*ecific language governing permissions and limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import * as log from 'loglevel';

import SocialButton from './SocialButton';
import { loginUserProvider } from '../../actions/authActions';
import Config from '../../config';

/**
 * UI Component to render social login buttons
 */
export const SocialLogins = props => (
  <div>
    { props.showFacebook &&
      <SocialButton
        provider="facebook"
        appId={Config.socialFacebookAppId}
        color="facebook"
        fluid
        hidden={props.showFacebook}
        onLoginSuccess={(resp) => {
          props.loginUserProvider(resp.provider, resp.profile, resp.token.accessToken);
        }}
        onLoginFailure={(resp) => { log.error(resp); }}
      >
        <Icon name="facebook" />
        Login with Facebook
      </SocialButton>
    }
    { props.showGoogle &&
      <SocialButton
        provider="google"
        appId={Config.socialGoogleClientId}
        color="google plus"
        fluid
        onLoginSuccess={(resp) => {
          props.loginUserProvider(resp.provider, resp.profile, resp.token.idToken);
        }}
        onLoginFailure={(resp) => {
          log.error(resp);
        }}
      >
        <Icon name="google" />
        Login with Google
      </SocialButton>
    }
    { props.showAmazon &&
      <SocialButton
        provider="amazon"
        color="yellow"
        fluid
        appId={Config.socialAmazonAppId}
        onLoginSuccess={(resp) => {
          props.loginUserProvider(resp.provider, resp.profile, resp.token.accessToken);
        }}
        onLoginFailure={(resp) => { log.error(resp); }}
      >
        <Icon name="amazon" />
        Login with Amazon
      </SocialButton>
    }
  </div>
);

SocialLogins.propTypes = {
  loginUserProvider: PropTypes.func.isRequired,
  showFacebook: PropTypes.bool,
  showGoogle: PropTypes.bool,
  showAmazon: PropTypes.bool,
};

SocialLogins.defaultProps = {
  showFacebook: false,
  showGoogle: false,
  showAmazon: false,
};

export default connect(null, { loginUserProvider })(SocialLogins);
