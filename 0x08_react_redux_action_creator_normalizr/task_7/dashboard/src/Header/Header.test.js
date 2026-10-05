import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import AppContext, { user } from '../App/AppContext';

describe('Header', () => {
  test('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find(Header)).toHaveLength(1);
    wrapper.unmount();
  });

  test('renders an image and heading', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
    wrapper.unmount();
  });

  test('does not display logoutSection when logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    wrapper.unmount();
  });

  test('displays the user email when logged in', () => {
    const loggedInUser = {
      email: 'beni@example.com',
      password: 'mypassword',
      isLoggedIn: true,
    };

    const wrapper = mount(
      <AppContext.Provider
        value={{ user: loggedInUser, logOut: () => {} }}
      >
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain(
      'beni@example.com'
    );

    wrapper.unmount();
  });

  test('clicking logout calls the context logOut function', () => {
    const logOut = jest.fn();

    const loggedInUser = {
      email: 'beni@example.com',
      password: 'mypassword',
      isLoggedIn: true,
    };

    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    const preventDefault = jest.fn();

    wrapper.find('#logoutSection a').simulate('click', {
      preventDefault,
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(logOut).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});
