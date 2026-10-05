import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
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
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UI action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('login creates the correct action', () => {
    expect(login('test@test.com', 'password123')).toEqual({
      type: LOGIN,
      user: {
        email: 'test@test.com',
        password: 'password123',
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

  it('loginSuccess creates the correct action', () => {
    expect(loginSuccess()).toEqual({
      type: LOGIN_SUCCESS,
    });
  });

  it('loginFailure creates the correct action', () => {
    expect(loginFailure()).toEqual({
      type: LOGIN_FAILURE,
    });
  });

  it('loginRequest dispatches LOGIN then LOGIN_SUCCESS', () => {
    fetchMock.getOnce('/login-success.json', {
      body: {},
      status: 200,
    });

    const store = mockStore({});

    return store
      .dispatch(loginRequest('test@test.com', 'password123'))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: LOGIN,
            user: {
              email: 'test@test.com',
              password: 'password123',
            },
          },
          {
            type: LOGIN_SUCCESS,
          },
        ]);
      });
  });

  it('loginRequest dispatches LOGIN then LOGIN_FAILURE when request fails', () => {
    fetchMock.getOnce('/login-success.json', {
      body: {},
      status: 500,
    });

    const store = mockStore({});

    return store
      .dispatch(loginRequest('test@test.com', 'password123'))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: LOGIN,
            user: {
              email: 'test@test.com',
              password: 'password123',
            },
          },
          {
            type: LOGIN_FAILURE,
          },
        ]);
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
