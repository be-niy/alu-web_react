import {
  notificationReducer,
  initialState,
} from './notificationReducer';

import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const notifications = [
    {
      id: 1,
      type: 'default',
      value: 'New course available',
    },
    {
      id: 2,
      type: 'urgent',
      value: 'New resume available',
    },
    {
      id: 3,
      type: 'urgent',
      value: 'New data available',
    },
  ];

  it('returns the initial state by default', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('handles FETCH_NOTIFICATIONS_SUCCESS', () => {
    const state = notificationReducer(initialState, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });

    expect(state).toEqual({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        {
          id: 1,
          type: 'default',
          value: 'New course available',
          isRead: false,
        },
        {
          id: 2,
          type: 'urgent',
          value: 'New resume available',
          isRead: false,
        },
        {
          id: 3,
          type: 'urgent',
          value: 'New data available',
          isRead: false,
        },
      ],
    });
  });

  it('handles MARK_AS_READ', () => {
    const stateWithNotifications = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: notifications.map((notification) => ({
        ...notification,
        isRead: false,
      })),
    };

    const state = notificationReducer(stateWithNotifications, {
      type: MARK_AS_READ,
      index: 2,
    });

    expect(state.notifications[1].isRead).toBe(true);
    expect(state.notifications[0].isRead).toBe(false);
    expect(state.notifications[2].isRead).toBe(false);
  });

  it('handles SET_TYPE_FILTER', () => {
    const state = notificationReducer(initialState, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });

    expect(state.filter).toBe(NotificationTypeFilters.URGENT);
  });
});
