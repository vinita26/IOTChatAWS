
import React from 'react';
import PropTypes from 'prop-types';
import { Header, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Message from './Message';
import LoadingUserComment from './LoadingUserComment';
import { topicFromParams } from '../../lib/topicHelper';

/**
 * Presentational component to render the list of messages
 */
export const MessageHistory = ({ messages }) => (
  <Comment.Group>
    <Header as="h3" dividing>Chat History</Header>
    {messages.map(message => (
      <Message
        key={message.id}
        {...message}
      />
    ))}
    <LoadingUserComment />
  </Comment.Group>
);


MessageHistory.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export const mapStateToProps = (state, ownProps) => {
  const topic = topicFromParams(ownProps.match.params);
  const room = state.rooms[topic];
  return {
    messages: room ? room.messages : [],
  };
};

export default withRouter(connect(mapStateToProps)(MessageHistory));
