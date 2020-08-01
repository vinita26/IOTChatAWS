

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import RoomMenuItem from './RoomMenuItem';
import { topicFromParams, topicFromSubscriptionTopic } from '../../lib/topicHelper';

/**
 * Component to display subscribed to chat rooms and ability to switch rooms
 */
export const RoomMenu = props => (
  <Menu
    vertical
    size="large"
  >
    { props.subscribedTopics.map((subscribedTopic) => {
      const topic = topicFromSubscriptionTopic(subscribedTopic);
      const pathTopic = topicFromParams(props.match.params);
      const active = topic === pathTopic;
      return <RoomMenuItem key={topic} topic={topic} active={active} />;
    })}
  </Menu>
);

RoomMenu.propTypes = {
  subscribedTopics: PropTypes.arrayOf(PropTypes.string).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomType: PropTypes.string.isRequired,
      roomName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  subscribedTopics: state.chat.subscribedTopics,
});


export default withRouter(connect(mapStateToProps, null)(RoomMenu));
