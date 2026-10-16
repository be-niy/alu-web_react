import { uiReducer, initialState } from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';

describe('uiReducer', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('returns the initial state when SELECT_COURSE is passed', () => {
    expect(
      uiReducer(undefined, {
        type: SELECT_COURSE,
        index: 1,
      }).toJS()
    ).toEqual(initialState.toJS());
  });

  it('sets isNotificationDrawerVisible to true', () => {
    const state = uiReducer(initialState, {
      type: DISPLAY_NOTIFICATION_DRAWER,
    });

    expect(state.get('isNotificationDrawerVisible')).toBe(true);
    expect(state.get('isUserLoggedIn')).toBe(false);
  });

  it('sets isNotificationDrawerVisible to false', () => {
    const visibleState = uiReducer(initialState, {
      type: DISPLAY_NOTIFICATION_DRAWER,
    });

    const state = uiReducer(visibleState, {
      type: HIDE_NOTIFICATION_DRAWER,
    });

    expect(state.get('isNotificationDrawerVisible')).toBe(false);
  });

  it('stores user information when LOGIN is dispatched', () => {
    const user = {
      email: 'beni@example.com',
      password: 'mypassword',
    };

    const state = uiReducer(initialState, {
      type: LOGIN,
      user,
    });

    expect(state.get('user')).toEqual(user);
    expect(state.get('isUserLoggedIn')).toBe(false);
  });

  it('sets isUserLoggedIn to true after LOGIN_SUCCESS', () => {
    const state = uiReducer(initialState, {
      type: LOGIN_SUCCESS,
    });

    expect(state.get('isUserLoggedIn')).toBe(true);
  });

  it('preserves user information after LOGIN_SUCCESS', () => {
    const user = {
      email: 'beni@example.com',
      password: 'mypassword',
    };

    const loginState = uiReducer(initialState, {
      type: LOGIN,
      user,
    });

    const state = uiReducer(loginState, {
      type: LOGIN_SUCCESS,
    });

    expect(state.get('user')).toEqual(user);
    expect(state.get('isUserLoggedIn')).toBe(true);
  });

  it('clears user information after LOGIN_FAILURE', () => {
    const loginState = uiReducer(initialState, {
      type: LOGIN,
      user: {
        email: 'beni@example.com',
        password: 'mypassword',
      },
    });

    const state = uiReducer(loginState, {
      type: LOGIN_FAILURE,
    });

    expect(state.get('isUserLoggedIn')).toBe(false);
    expect(state.get('user')).toEqual({});
  });

  it('clears login status and user information after LOGOUT', () => {
    const loginState = uiReducer(initialState, {
      type: LOGIN,
      user: {
        email: 'beni@example.com',
        password: 'mypassword',
      },
    });

    const loggedInState = uiReducer(loginState, {
      type: LOGIN_SUCCESS,
    });

    const state = uiReducer(loggedInState, {
      type: LOGOUT,
    });

    expect(state.get('isUserLoggedIn')).toBe(false);
    expect(state.get('user')).toEqual({});
  });

  it('preserves notification drawer state when logging in', () => {
    const visibleState = uiReducer(initialState, {
      type: DISPLAY_NOTIFICATION_DRAWER,
    });

    const state = uiReducer(visibleState, {
      type: LOGIN,
      user: {
        email: 'beni@example.com',
        password: 'mypassword',
      },
    });

    expect(state.get('isNotificationDrawerVisible')).toBe(true);
  });
});
