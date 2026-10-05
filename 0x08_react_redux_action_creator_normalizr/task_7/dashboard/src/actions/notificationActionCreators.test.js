import {
  markAsAread,
  setNotificationFilter,
  boundMarkAsAread,
  boundSetNotificationFilter,
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

  it('boundMarkAsAread dispatches markAsAread', () => {
    const dispatch = jest.fn();

    boundMarkAsAread(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: MARK_AS_READ,
      index: 1,
    });
  });

  it('boundSetNotificationFilter dispatches setNotificationFilter', () => {
    const dispatch = jest.fn();

    boundSetNotificationFilter(NotificationTypeFilters.URGENT)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
  });
});
