import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  item: {
    '@media (max-width: 900px)': {
      width: '100%',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
      boxSizing: 'border-box',
    },
  },

  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
  },
});

function NotificationItem({ id, type, html, value, markAsRead }) {
  const priorityStyle =
    type === 'urgent' ? styles.urgent : styles.default;

  return (
    <li
      className={css(styles.item, priorityStyle)}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
      {...(html
        ? { dangerouslySetInnerHTML: html }
        : { children: value })}
    />
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  id: 0,
  html: null,
  type: 'default',
  value: null,
  markAsRead: () => {},
};

export default React.memo(NotificationItem);
