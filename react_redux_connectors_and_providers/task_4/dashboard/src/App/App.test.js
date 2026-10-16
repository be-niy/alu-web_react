import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import AppContext from './AppContext';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('App', () => {
  let wrapper;
  let loginRequest;
  let logout;
  let displayNotificationDrawer;
  let hideNotificationDrawer;

  beforeEach(() => {
    loginRequest = jest.fn();
    logout = jest.fn();
    displayNotificationDrawer = jest.fn();
    hideNotificationDrawer = jest.fn();

    wrapper = shallow(
      <App
        isLoggedIn={false}
        displayDrawer={false}
        loginRequest={loginRequest}
        logout={logout}
        displayNotificationDrawer={displayNotificationDrawer}
        hideNotificationDrawer={hideNotificationDrawer}
      />
    );
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

  test('renders Login when the user is not logged in', () => {
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  test('renders CourseList when Redux reports logged in', () => {
    wrapper.setProps({ isLoggedIn: true });

    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find(CourseList).prop('listCourses')).toHaveLength(3);
  });

  test('passes loginRequest to Login', () => {
    expect(wrapper.find(Login).prop('logIn')).toBe(loginRequest);
  });

  test('Login can call the Redux loginRequest action', () => {
    wrapper.find(Login).prop('logIn')(
      'beni@example.com',
      'mypassword'
    );

    expect(loginRequest).toHaveBeenCalledWith(
      'beni@example.com',
      'mypassword'
    );
  });

  test('provides login status through context', () => {
    expect(
      wrapper.find(AppContext.Provider).prop('value').user.isLoggedIn
    ).toBe(false);

    wrapper.setProps({ isLoggedIn: true });

    expect(
      wrapper.find(AppContext.Provider).prop('value').user.isLoggedIn
    ).toBe(true);
  });

  test('provides Redux logout through context', () => {
    expect(
      wrapper.find(AppContext.Provider).prop('value').logOut
    ).toBe(logout);
  });

  test('Ctrl+H displays alert and dispatches logout', () => {
    const alertSpy = jest.spyOn(window, 'alert')
      .mockImplementation(() => {});

    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    }));

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(logout).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
  });

  test('passes three notifications to Notifications', () => {
    expect(
      wrapper.find(Notifications).prop('listNotifications')
    ).toHaveLength(3);
  });

  test('passes Redux drawer visibility to Notifications', () => {
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(false);

    wrapper.setProps({ displayDrawer: true });

    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
  });

  test('passes displayNotificationDrawer to Notifications', () => {
    expect(
      wrapper.find(Notifications).prop('handleDisplayDrawer')
    ).toBe(displayNotificationDrawer);

    wrapper.find(Notifications).prop('handleDisplayDrawer')();

    expect(displayNotificationDrawer).toHaveBeenCalledTimes(1);
  });

  test('passes hideNotificationDrawer to Notifications', () => {
    expect(
      wrapper.find(Notifications).prop('handleHideDrawer')
    ).toBe(hideNotificationDrawer);

    wrapper.find(Notifications).prop('handleHideDrawer')();

    expect(hideNotificationDrawer).toHaveBeenCalledTimes(1);
  });

  test('initializes the notification list with three notifications', () => {
    expect(wrapper.state('listNotifications')).toHaveLength(3);
  });

  test('markNotificationAsRead removes the selected notification', () => {
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

describe('mapStateToProps', () => {
  test('maps logged-in state and visible drawer', () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: true,
    });

    expect(mapStateToProps({ ui: state })).toEqual({
      isLoggedIn: true,
      displayDrawer: true,
    });
  });

  test('maps logged-out state and hidden drawer', () => {
    const state = fromJS({
      isUserLoggedIn: false,
      isNotificationDrawerVisible: false,
    });

    expect(mapStateToProps({ ui: state })).toEqual({
      isLoggedIn: false,
      displayDrawer: false,
    });
  });

  test('maps drawer visibility independently of login state', () => {
    const state = fromJS({
      isUserLoggedIn: false,
      isNotificationDrawerVisible: true,
    });

    expect(mapStateToProps({ ui: state })).toEqual({
      isLoggedIn: false,
      displayDrawer: true,
    });
  });
});
