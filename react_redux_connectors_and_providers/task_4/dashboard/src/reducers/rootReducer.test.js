import { Map } from 'immutable';
import { rootReducer } from './rootReducer';
import { logout } from '../actions/uiActionCreators';

describe('rootReducer', () => {
  it('initializes courses, notifications, and ui state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(Object.keys(state).sort()).toEqual([
      'courses',
      'notifications',
      'ui',
    ]);

    expect(Map.isMap(state.courses)).toBe(true);
    expect(Map.isMap(state.notifications)).toBe(true);
    expect(Map.isMap(state.ui)).toBe(true);
  });

  it('preserves all state sections when handling an unknown action', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const nextState = rootReducer(initialState, {
      type: 'UNKNOWN_ACTION',
    });

    expect(nextState).toEqual(initialState);
  });

  it('updates the ui state without changing courses or notifications', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    const loggedInState = rootReducer(initialState, {
      type: 'LOGIN_SUCCESS',
    });

    expect(loggedInState.ui.get('isUserLoggedIn')).toBe(true);
    expect(loggedInState.courses).toBe(initialState.courses);
    expect(loggedInState.notifications).toBe(initialState.notifications);

    const loggedOutState = rootReducer(loggedInState, logout());

    expect(loggedOutState.ui.get('isUserLoggedIn')).toBe(false);
  });
});
