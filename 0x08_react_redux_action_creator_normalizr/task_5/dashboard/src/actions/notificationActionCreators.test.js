import {
  markAsAread,
  setNotificationFilter,
} from './notificationActionCreators';

import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes';

describe('Notification action creators', () => {
  it('markAsAread creates the correct action', () => {
    expect(markAsAread(1)).toEqual({
      type: MARK_AS_READ,
      index: 1,
    });
  });

  it('setNotificationFilter creates the correct action', () => {
    expect(
      setNotificationFilter(NotificationTypeFilters.URGENT)
    ).toEqual({
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
  });
});
