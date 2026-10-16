
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
    expect(notificationReducer(undefined, {}).toJS()).toEqual(
      initialState.toJS()
    );
  });

  it('handles FETCH_NOTIFICATIONS_SUCCESS', () => {
    const state = notificationReducer(initialState, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });

    expect(state.get('filter')).toBe(
      NotificationTypeFilters.DEFAULT
    );

    expect(state.get('notifications').toJS()).toEqual({
      1: {
        id: 1,
        type: 'default',
        value: 'New course available',
      },
      2: {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
      3: {
        id: 3,
        type: 'urgent',
        value: 'New data available',
      },
    });
  });

  it('handles MARK_AS_READ', () => {
    let state = notificationReducer(initialState, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });

    state = notificationReducer(state, {
      type: MARK_AS_READ,
      index: 2,
    });

    expect(
      state.getIn(['notifications', '2', 'isRead'])
    ).toBe(true);
  });

  it('handles SET_TYPE_FILTER', () => {
    const state = notificationReducer(initialState, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });

    expect(state.get('filter')).toBe(
      NotificationTypeFilters.URGENT
    );
  });
});
