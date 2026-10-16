import { Map } from 'immutable';

import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/uiActionTypes';

export const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});

export function uiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);

    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);

    case LOGIN:
      return state.set('user', action.user);

    case LOGIN_SUCCESS:
      return state.set('isUserLoggedIn', true);

    case LOGIN_FAILURE:
      return state
        .set('isUserLoggedIn', false)
        .set('user', {});

    case LOGOUT:
      return state
        .set('isUserLoggedIn', false)
        .set('user', {});

    default:
      return state;
  }
}
