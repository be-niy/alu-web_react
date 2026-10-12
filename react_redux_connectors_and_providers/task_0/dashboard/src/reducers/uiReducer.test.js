import { uiReducer, initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
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
});
