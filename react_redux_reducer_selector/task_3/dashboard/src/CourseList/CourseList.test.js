import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList', () => {
  test('renders without crashing', () => {
    shallow(<CourseList />);
  });

  test('renders one row containing No course available yet when listCourses is empty', () => {
    const wrapper = shallow(<CourseList />);

    const rows = wrapper.find(CourseListRow);
    expect(rows).toHaveLength(3);
    expect(rows.at(2).prop('textFirstCell')).toEqual(
      'No course available yet'
    );
  });

  test('renders one row for each course when listCourses is provided', () => {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const wrapper = shallow(
      <CourseList listCourses={listCourses} />
    );

    expect(wrapper.find(CourseListRow)).toHaveLength(5);
    expect(wrapper.find(CourseListRow).at(2).prop('textFirstCell')).toEqual('ES6');
    expect(wrapper.find(CourseListRow).at(3).prop('textFirstCell')).toEqual('Webpack');
    expect(wrapper.find(CourseListRow).at(4).prop('textFirstCell')).toEqual('React');
  });
});
