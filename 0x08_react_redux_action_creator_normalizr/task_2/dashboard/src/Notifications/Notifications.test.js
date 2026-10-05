import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

const listNotifications = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    html: { __html: '<strong>Urgent requirement</strong>' },
  },
];

describe('Notifications', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  test('extends React.PureComponent', () => {
    expect(Notifications.prototype).toBeInstanceOf(React.PureComponent);
  });

  test('renders the menu item', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.text()).toContain('Your notifications');
  });

  test('does not display drawer by default', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('button[aria-label="Close"]')).toHaveLength(0);
  });

  test('displays drawer when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('button[aria-label="Close"]')).toHaveLength(1);
  });

  test('renders default message when notifications are empty', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );

    expect(wrapper.find(NotificationItem)).toHaveLength(1);
    expect(wrapper.find(NotificationItem).prop('value')).toBe(
      'No new notifications for now'
    );
  });

  test('renders one item per notification', () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );

    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  test('passes markNotificationAsRead to notification items', () => {
    const markNotificationAsRead = jest.fn();

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    wrapper.find(NotificationItem).at(0).prop('markAsRead')(1);

    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
  });

  test('does not rerender when the same props are provided', () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );

    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({ listNotifications });

    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  test('rerenders when the notification list reference changes', () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );

    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({
      listNotifications: [...listNotifications],
    });

    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  test('clicking the menu calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();

    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} />
    );

    wrapper.find('div').filterWhere(
      (node) => node.text() === 'Your notifications'
    ).simulate('click');

    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking close calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );

    wrapper.find('button[aria-label="Close"]').simulate('click');

    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  test('rerenders when displayDrawer changes', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={false} />
    );

    wrapper.setProps({ displayDrawer: true });

    expect(wrapper.find('button[aria-label="Close"]')).toHaveLength(1);
  });
});
