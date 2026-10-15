import { fromJS } from 'immutable';

import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    filter: 'DEFAULT',
    notifications: {
      1: {
        id: 1,
        type: 'default',
        value: 'New course available',
        isRead: false,
      },
      2: {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
        isRead: true,
      },
      3: {
        id: 3,
        type: 'urgent',
        value: 'New data available',
        isRead: false,
      },
    },
  });

  it('filterTypeSelected returns the selected filter', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');
  });

  it('getNotifications returns all notifications', () => {
    const notifications = getNotifications(state);

    expect(notifications.size).toBe(3);
    expect(notifications.getIn(['1', 'id'])).toBe(1);
    expect(notifications.getIn(['2', 'id'])).toBe(2);
    expect(notifications.getIn(['3', 'id'])).toBe(3);
  });

  it('getUnreadNotifications returns only unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);

    expect(unreadNotifications.size).toBe(2);
    expect(unreadNotifications.has('1')).toBe(true);
    expect(unreadNotifications.has('2')).toBe(false);
    expect(unreadNotifications.has('3')).toBe(true);
  });
});
