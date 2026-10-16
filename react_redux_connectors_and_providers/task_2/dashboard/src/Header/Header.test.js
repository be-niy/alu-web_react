import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import Header, {
  Header as HeaderComponent,
  mapStateToProps,
} from './Header';
import { uiReducer } from '../reducers/uiReducer';
import { login, loginSuccess } from '../actions/uiActionCreators';

describe('Header', () => {
  test('renders without crashing', () => {
    const store = createStore(uiReducer);

    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(wrapper.find(HeaderComponent)).toHaveLength(1);
    wrapper.unmount();
  });

  test('renders an image and heading', () => {
    const wrapper = shallow(
      <HeaderComponent
        isLoggedIn={false}
        user={{}}
        logout={jest.fn()}
      />
    );

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
  });

  test('does not display logoutSection when logged out', () => {
    const wrapper = shallow(
      <HeaderComponent
        isLoggedIn={false}
        user={{}}
        logout={jest.fn()}
      />
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  test('displays the user email when logged in', () => {
    const wrapper = shallow(
      <HeaderComponent
        isLoggedIn={true}
        user={{ email: 'beni@example.com' }}
        logout={jest.fn()}
      />
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain(
      'beni@example.com'
    );
  });

  test('clicking logout calls the Redux logout prop', () => {
    const logout = jest.fn();

    const wrapper = shallow(
      <HeaderComponent
        isLoggedIn={true}
        user={{ email: 'beni@example.com' }}
        logout={logout}
      />
    );

    const preventDefault = jest.fn();

    wrapper.find('#logoutSection a').simulate('click', {
      preventDefault,
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(logout).toHaveBeenCalledTimes(1);
  });

  test('connected Header displays the Redux user email', () => {
    const store = createStore(uiReducer);

    store.dispatch(login('beni@example.com', 'mypassword'));
    store.dispatch(loginSuccess());

    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain(
      'beni@example.com'
    );

    wrapper.unmount();
  });

  test('clicking logout updates Redux login state', () => {
    const store = createStore(uiReducer);

    store.dispatch(login('beni@example.com', 'mypassword'));
    store.dispatch(loginSuccess());

    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(store.getState().get('isUserLoggedIn')).toBe(true);

    wrapper.find('#logoutSection a').simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(store.getState().get('isUserLoggedIn')).toBe(false);
    expect(store.getState().get('user')).toEqual({});

    wrapper.update();

    expect(wrapper.find('#logoutSection')).toHaveLength(0);

    wrapper.unmount();
  });
});

describe('Header mapStateToProps', () => {
  test('maps logged-in Redux state and user information', () => {
    const user = {
      email: 'beni@example.com',
      password: 'mypassword',
    };

    const state = fromJS({
      isUserLoggedIn: true,
    }).set('user', user);

    expect(mapStateToProps(state)).toEqual({
      isLoggedIn: true,
      user,
    });
  });

  test('maps logged-out Redux state', () => {
    const state = fromJS({
      isUserLoggedIn: false,
    }).set('user', {});

    expect(mapStateToProps(state)).toEqual({
      isLoggedIn: false,
      user: {},
    });
  });
});
