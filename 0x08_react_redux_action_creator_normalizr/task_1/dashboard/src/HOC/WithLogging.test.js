import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('logs Component when wrapping an anonymous component', () => {
    const WrappedComponent = WithLogging(() => <p>Hello</p>);

    const wrapper = mount(<WrappedComponent />);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Component is mounted'
    );

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Component is going to unmount'
    );
  });

  test('logs Login when wrapping the Login component', () => {
    const WrappedLogin = WithLogging(Login);

    const wrapper = mount(<WrappedLogin />);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Login is mounted'
    );

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Login is going to unmount'
    );
  });
});
