import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import AppContext, { user } from './AppContext';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('wraps the application in AppContext.Provider', () => {
    expect(wrapper.find(AppContext.Provider)).toHaveLength(1);
  });

  test('contains Notifications, Header and Footer', () => {
    expect(wrapper.find(Notifications)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  test('initializes the default user in state', () => {
    expect(wrapper.state('value').user).toEqual(user);
    expect(wrapper.state('value').logOut).toBe(
      wrapper.instance().logOut
    );
  });

  test('renders Login instead of CourseList by default', () => {
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  test('logIn updates user state and displays CourseList', () => {
    wrapper.instance().logIn('beni@example.com', 'mypassword');

    expect(wrapper.state('value').user).toEqual({
      email: 'beni@example.com',
      password: 'mypassword',
      isLoggedIn: true,
    });

    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find(CourseList).prop('listCourses')).toHaveLength(3);
  });

  test('passes logIn to Login', () => {
    expect(wrapper.find(Login).prop('logIn')).toBe(
      wrapper.instance().logIn
    );
  });

  test('logOut resets the user and displays Login', () => {
    wrapper.instance().logIn('beni@example.com', 'mypassword');
    wrapper.instance().logOut();

    expect(wrapper.state('value').user).toEqual(user);
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  test('provides the current state value through context', () => {
    wrapper.instance().logIn('beni@example.com', 'mypassword');

    expect(wrapper.find(AppContext.Provider).prop('value')).toBe(
      wrapper.state('value')
    );
  });

  test('passes three notifications to Notifications', () => {
    expect(
      wrapper.find(Notifications).prop('listNotifications')
    ).toHaveLength(3);
  });

  test('Ctrl+H displays alert and logs the user out', () => {
    const alertSpy = jest.spyOn(window, 'alert')
      .mockImplementation(() => {});

    wrapper.instance().logIn('beni@example.com', 'mypassword');

    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    }));

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(wrapper.state('value').user).toEqual(user);

    alertSpy.mockRestore();
  });

  test('displayDrawer is false by default and becomes true when opened', () => {
    expect(wrapper.state('displayDrawer')).toBe(false);

    wrapper.instance().handleDisplayDrawer();

    expect(wrapper.state('displayDrawer')).toBe(true);
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
  });

  test('handleHideDrawer sets displayDrawer to false', () => {
    wrapper.setState({ displayDrawer: true });
    wrapper.instance().handleHideDrawer();

    expect(wrapper.state('displayDrawer')).toBe(false);
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(false);
  });

  test('initializes the notification list with three notifications', () => {
    expect(wrapper.state('listNotifications')).toHaveLength(3);
  });

  test('markNotificationAsRead removes only the selected notification', () => {
    wrapper.instance().markNotificationAsRead(2);

    const notifications = wrapper.state('listNotifications');

    expect(notifications).toHaveLength(2);
    expect(notifications.map((notification) => notification.id)).toEqual([
      1,
      3,
    ]);

    expect(
      wrapper.find(Notifications).prop('listNotifications')
    ).toHaveLength(2);
  });

  test('passes markNotificationAsRead to Notifications', () => {
    expect(
      wrapper.find(Notifications).prop('markNotificationAsRead')
    ).toBe(wrapper.instance().markNotificationAsRead);
  });

});
