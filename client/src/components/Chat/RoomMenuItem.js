

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import { formatRoomCardHeader } from '../../lib/topicHelper';

/**
 * Component to display subscribed to chat rooms and ability to switch rooms
 */
export const RoomMenuItem = (props) => {
  const { topic, active, unreadCount } = props;
  return (
    <Menu.Item
      name={topic}
      active={active}
      key={topic}
      as={Link}
      to={`/app/${topic}`}
    >
      <Label color={active ? 'teal' : 'grey'}>{unreadCount}</Label>
      {formatRoomCardHeader(topic)}
    </Menu.Item>
  );
};

RoomMenuItem.propTypes = {
  topic: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  unreadCount: state.unreads[ownProps.topic] || 0,
});


export default withRouter(connect(mapStateToProps)(RoomMenuItem));
