

import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

/**
 * Presentational component to display a chat message
 */
const Message = ({ author, time, text }) => (
  <Comment>
    <Comment.Content>
      <Comment.Author as="a">{author}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(time).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

Message.propTypes = {
  author: PropTypes.string.isRequired,
  time: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
