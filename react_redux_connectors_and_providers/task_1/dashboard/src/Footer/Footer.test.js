import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import AppContext, { user } from '../App/AppContext';

describe('Footer', () => {
  test('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>
    );

    expect(wrapper.find(Footer)).toHaveLength(1);
    wrapper.unmount();
  });

  test('renders Copyright text', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toContain('Copyright');
    wrapper.unmount();
  });

  test('does not display Contact us when logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>
    );

    expect(wrapper.text()).not.toContain('Contact us');
    wrapper.unmount();
  });

  test('displays Contact us when logged in', () => {
    const loggedInUser = {
      email: 'beni@example.com',
      password: 'mypassword',
      isLoggedIn: true,
    };

    const wrapper = mount(
      <AppContext.Provider
        value={{ user: loggedInUser, logOut: () => {} }}
      >
        <Footer />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toContain('Contact us');
    expect(wrapper.find('a[href="mailto:contact@holbertonschool.com"]'))
      .toHaveLength(1);

    wrapper.unmount();
  });
});
