import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import Footer, { Footer as FooterComponent, mapStateToProps } from './Footer';
import { uiReducer } from '../reducers/uiReducer';
import { loginSuccess } from '../actions/uiActionCreators';

describe('Footer', () => {
  test('renders without crashing', () => {
    const store = createStore(uiReducer);

    const wrapper = mount(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(wrapper.find(FooterComponent)).toHaveLength(1);
    wrapper.unmount();
  });

  test('renders Copyright text', () => {
    const wrapper = shallow(<FooterComponent isLoggedIn={false} />);

    expect(wrapper.text()).toContain('Copyright');
  });

  test('does not display Contact us when logged out', () => {
    const wrapper = shallow(<FooterComponent isLoggedIn={false} />);

    expect(wrapper.text()).not.toContain('Contact us');
    expect(wrapper.find('a')).toHaveLength(0);
  });

  test('displays Contact us when logged in', () => {
    const wrapper = shallow(<FooterComponent isLoggedIn={true} />);

    expect(wrapper.text()).toContain('Contact us');
    expect(
      wrapper.find('a[href="mailto:contact@holbertonschool.com"]')
    ).toHaveLength(1);
  });

  test('connected Footer updates when Redux login succeeds', () => {
    const store = createStore(uiReducer);

    const wrapper = mount(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(wrapper.text()).not.toContain('Contact us');

    store.dispatch(loginSuccess());
    wrapper.update();

    expect(wrapper.text()).toContain('Contact us');

    wrapper.unmount();
  });
});

describe('Footer mapStateToProps', () => {
  test('maps logged-in Redux state to Footer props', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });

    expect(mapStateToProps(state)).toEqual({
      isLoggedIn: true,
    });
  });

  test('maps logged-out Redux state to Footer props', () => {
    const state = fromJS({
      isUserLoggedIn: false,
    });

    expect(mapStateToProps(state)).toEqual({
      isLoggedIn: false,
    });
  });
});
