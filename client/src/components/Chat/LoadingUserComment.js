

import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';

export const LoadingUserComment = props => (
  <Comment
    collapsed={!props.fetchingUser}
  >
    <Comment.Content>
      <Comment.Text>Identifying message sender...</Comment.Text>
    </Comment.Content>
  </Comment>
);


LoadingUserComment.propTypes = {
  fetchingUser: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  fetchingUser: state.chat.fetchingUser,
});

export default connect(mapStateToProps)(LoadingUserComment);
