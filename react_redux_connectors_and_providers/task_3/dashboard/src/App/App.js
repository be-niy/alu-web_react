import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
} from '../actions/uiActionCreators';
import AppContext, { user } from './AppContext';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

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
    html: { __html: getLatestNotification() },
  },
];

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
  },

  body: {
    minHeight: '60vh',
  },

  footer: {
    borderTop: '3px solid #e1003c',
    fontStyle: 'italic',
  },
});

export const mapStateToProps = (state) => ({
  isLoggedIn: state.get('isUserLoggedIn'),
  displayDrawer: state.get('isNotificationDrawerVisible'),
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      listNotifications,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout();
    }
  }

  markNotificationAsRead(id) {
    this.setState((prevState) => ({
      listNotifications: prevState.listNotifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  }

  render() {
    const { listNotifications } = this.state;
    const {
      isLoggedIn,
      displayDrawer,
      displayNotificationDrawer,
      hideNotificationDrawer,
      loginRequest,
      logout,
    } = this.props;

    const contextValue = {
      user: {
        ...user,
        isLoggedIn,
      },
      logOut: logout,
    };

    return (
      <AppContext.Provider value={contextValue}>
        <Notifications
          listNotifications={listNotifications}
          markNotificationAsRead={this.markNotificationAsRead}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
        />

        <div className={css(styles.app)}>
          <Header />

          <div className={css(styles.body)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={loginRequest} />
              </BodySectionWithMarginBottom>
            )}

            <BodySection title="News from the School">
              <p>Holberton School News goes here</p>
            </BodySection>
          </div>

          <div className={css(styles.footer)}>
            <Footer />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export { App };

export default connect(mapStateToProps, {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
})(App);
