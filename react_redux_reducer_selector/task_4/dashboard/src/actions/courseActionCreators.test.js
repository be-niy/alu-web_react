import {
  selectCourse,
  unSelectCourse,
  boundSelectCourse,
  boundUnSelectCourse,
} from './courseActionCreators';

import {
  SELECT_COURSE,
  UNSELECT_COURSE,
} from './courseActionTypes';

describe('Course action creators', () => {
  it('selectCourse creates the correct action', () => {
    expect(selectCourse(1)).toEqual({
      type: SELECT_COURSE,
      index: 1,
    });
  });

  it('unSelectCourse creates the correct action', () => {
    expect(unSelectCourse(1)).toEqual({
      type: UNSELECT_COURSE,
      index: 1,
    });
  });

  it('boundSelectCourse dispatches selectCourse', () => {
    const dispatch = jest.fn();

    boundSelectCourse(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SELECT_COURSE,
      index: 1,
    });
  });

  it('boundUnSelectCourse dispatches unSelectCourse', () => {
    const dispatch = jest.fn();

    boundUnSelectCourse(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: UNSELECT_COURSE,
      index: 1,
    });
  });
});
