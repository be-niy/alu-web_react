import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  boundLogin,
  boundLogout,
  boundDisplayNotificationDrawer,
  boundHideNotificationDrawer,
} from './uiActionCreators';

import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';

describe('UI action creators', () => {
  it('login creates the correct action', () => {
    const email = 'test@test.com';
    const password = 'password123';

    expect(login(email, password)).toEqual({
      type: LOGIN,
      user: {
        email,
        password,
      },
    });
  });

  it('logout creates the correct action', () => {
    expect(logout()).toEqual({
      type: LOGOUT,
    });
  });

  it('displayNotificationDrawer creates the correct action', () => {
    expect(displayNotificationDrawer()).toEqual({
      type: DISPLAY_NOTIFICATION_DRAWER,
    });
  });

  it('hideNotificationDrawer creates the correct action', () => {
    expect(hideNotificationDrawer()).toEqual({
      type: HIDE_NOTIFICATION_DRAWER,
    });
  });

  it('boundLogin dispatches login', () => {
    const dispatch = jest.fn();

    boundLogin('test@test.com', 'password123')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: LOGIN,
      user: {
        email: 'test@test.com',
        password: 'password123',
      },
    });
  });

  it('boundLogout dispatches logout', () => {
    const dispatch = jest.fn();

    boundLogout()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: LOGOUT,
    });
  });

  it('boundDisplayNotificationDrawer dispatches displayNotificationDrawer', () => {
    const dispatch = jest.fn();

    boundDisplayNotificationDrawer()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: DISPLAY_NOTIFICATION_DRAWER,
    });
  });

  it('boundHideNotificationDrawer dispatches hideNotificationDrawer', () => {
    const dispatch = jest.fn();

    boundHideNotificationDrawer()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: HIDE_NOTIFICATION_DRAWER,
    });
  });
});
