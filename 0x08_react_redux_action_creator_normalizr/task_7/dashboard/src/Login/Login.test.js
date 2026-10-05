import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  test('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders three inputs and two labels', () => {
    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  test('has the correct default state', () => {
    expect(wrapper.state()).toEqual({
      email: '',
      password: '',
      enableSubmit: false,
    });
  });

  test('submit button is disabled by default', () => {
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  test('updates email and password when typing', () => {
    wrapper.find('input#email').simulate('change', {
      target: { value: 'beni@example.com' },
    });

    wrapper.find('input#password').simulate('change', {
      target: { value: 'mypassword' },
    });

    expect(wrapper.state('email')).toBe('beni@example.com');
    expect(wrapper.state('password')).toBe('mypassword');

    expect(wrapper.find('input#email').prop('value')).toBe('beni@example.com');
    expect(wrapper.find('input#password').prop('value')).toBe('mypassword');
  });

  test('enables submit when both fields contain text', () => {
    wrapper.find('input#email').simulate('change', {
      target: { value: 'beni@example.com' },
    });

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);

    wrapper.find('input#password').simulate('change', {
      target: { value: 'mypassword' },
    });

    expect(wrapper.state('enableSubmit')).toBe(true);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  test('disables submit again when one field becomes empty', () => {
    wrapper.find('input#email').simulate('change', {
      target: { value: 'beni@example.com' },
    });

    wrapper.find('input#password').simulate('change', {
      target: { value: 'mypassword' },
    });

    wrapper.find('input#email').simulate('change', {
      target: { value: '' },
    });

    expect(wrapper.state('enableSubmit')).toBe(false);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  test('submitting the form prevents reload and calls logIn', () => {
    const logIn = jest.fn();
    wrapper.setProps({ logIn });
    wrapper.find('input#email').simulate('change', {
      target: { value: 'beni@example.com' },
    });

    wrapper.find('input#password').simulate('change', {
      target: { value: 'mypassword' },
    });

    const preventDefault = jest.fn();

    wrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(logIn).toHaveBeenCalledWith('beni@example.com', 'mypassword');
  });
});
