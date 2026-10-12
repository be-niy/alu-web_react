import { courseReducer, initialState } from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

describe('courseReducer', () => {
  const courses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  it('returns an empty Immutable Map as the default state', () => {
    expect(courseReducer(undefined, {}).toJS()).toEqual({});
  });

  it('handles FETCH_COURSE_SUCCESS', () => {
    const state = courseReducer(initialState, {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    });

    expect(state.toJS()).toEqual({
      1: {
        id: 1,
        name: 'ES6',
        credit: 60,
      },
      2: {
        id: 2,
        name: 'Webpack',
        credit: 20,
      },
      3: {
        id: 3,
        name: 'React',
        credit: 40,
      },
    });
  });

  it('handles SELECT_COURSE', () => {
    let state = courseReducer(initialState, {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    });

    state = courseReducer(state, {
      type: SELECT_COURSE,
      index: 2,
    });

    expect(state.getIn(['2', 'isSelected'])).toBe(true);
  });

  it('handles UNSELECT_COURSE', () => {
    let state = courseReducer(initialState, {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    });

    state = courseReducer(state, {
      type: SELECT_COURSE,
      index: 2,
    });

    state = courseReducer(state, {
      type: UNSELECT_COURSE,
      index: 2,
    });

    expect(state.getIn(['2', 'isSelected'])).toBe(false);
  });
});
