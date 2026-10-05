import React from 'react';
import { mount } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  test('renders one cell with colspan 2 for a header without a second cell', () => {
    const wrapper = mount(
      <CourseListRow
        isHeader={true}
        textFirstCell="Available courses"
      />
    );

    expect(wrapper.find('th')).toHaveLength(1);
    expect(wrapper.find('th').prop('colSpan')).toBe('2');
    expect(wrapper.find('th').text()).toBe('Available courses');

    wrapper.unmount();
  });

  test('renders two th cells for a header with a second cell', () => {
    const wrapper = mount(
      <CourseListRow
        isHeader={true}
        textFirstCell="Course name"
        textSecondCell="Credit"
      />
    );

    expect(wrapper.find('th')).toHaveLength(2);
    expect(wrapper.find('th').at(0).text()).toBe('Course name');
    expect(wrapper.find('th').at(1).text()).toBe('Credit');

    wrapper.unmount();
  });

  test('renders two td cells for a normal row', () => {
    const wrapper = mount(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );

    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('td').at(0).text()).toBe('ES6');
    expect(wrapper.find('td').at(1).text()).toBe('60');

    wrapper.unmount();
  });

  test('uses the header background colour', () => {
    const wrapper = mount(
      <CourseListRow
        isHeader={true}
        textFirstCell="Course name"
        textSecondCell="Credit"
      />
    );

    expect(wrapper.find('tr').prop('style')).toEqual({
      backgroundColor: '#deb5b545',
    });

    wrapper.unmount();
  });

  test('uses the default background colour for a normal row', () => {
    const wrapper = mount(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );

    expect(wrapper.find('tr').prop('style')).toEqual({
      backgroundColor: '#f5f5f5ab',
    });

    wrapper.unmount();
  });

  test('changes background colour when a course row is clicked', () => {
    const wrapper = mount(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );

    wrapper.find('tr').simulate('click');

    expect(wrapper.find('tr').prop('style')).toEqual({
      backgroundColor: '#e6e4e4',
    });

    wrapper.unmount();
  });

  test('restores the original colour when clicked again', () => {
    const wrapper = mount(
      <CourseListRow textFirstCell="ES6" textSecondCell="60" />
    );

    wrapper.find('tr').simulate('click');
    wrapper.find('tr').simulate('click');

    expect(wrapper.find('tr').prop('style')).toEqual({
      backgroundColor: '#f5f5f5ab',
    });

    wrapper.unmount();
  });

  test('does not make header rows selectable', () => {
    const wrapper = mount(
      <CourseListRow
        isHeader={true}
        textFirstCell="Course name"
        textSecondCell="Credit"
      />
    );

    expect(wrapper.find('tr').prop('onClick')).toBeUndefined();

    wrapper.unmount();
  });
});
