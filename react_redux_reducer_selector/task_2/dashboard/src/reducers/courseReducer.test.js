import { courseReducer } from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

describe('courseReducer', () => {
  const courses = [
    {
      id: 1,
      name: 'ES6',
      credit: 60,
    },
    {
      id: 2,
      name: 'Webpack',
      credit: 20,
    },
    {
      id: 3,
      name: 'React',
      credit: 40,
    },
  ];

  it('returns an empty array as the default state', () => {
    expect(courseReducer(undefined, {})).toEqual([]);
  });

  it('handles FETCH_COURSE_SUCCESS', () => {
    const state = courseReducer([], {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    });

    expect(state).toEqual([
      {
        id: 1,
        name: 'ES6',
        credit: 60,
        isSelected: false,
      },
      {
        id: 2,
        name: 'Webpack',
        credit: 20,
        isSelected: false,
      },
      {
        id: 3,
        name: 'React',
        credit: 40,
        isSelected: false,
      },
    ]);
  });

  it('handles SELECT_COURSE', () => {
    const initialState = courses.map((course) => ({
      ...course,
      isSelected: false,
    }));

    const state = courseReducer(initialState, {
      type: SELECT_COURSE,
      index: 2,
    });

    expect(state[1].isSelected).toBe(true);
    expect(state[0].isSelected).toBe(false);
    expect(state[2].isSelected).toBe(false);
  });

  it('handles UNSELECT_COURSE', () => {
    const initialState = courses.map((course) => ({
      ...course,
      isSelected: course.id === 2,
    }));

    const state = courseReducer(initialState, {
      type: UNSELECT_COURSE,
      index: 2,
    });

    expect(state[1].isSelected).toBe(false);
  });
});
