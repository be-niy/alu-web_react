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

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.state = {
      listNotifications,
      value: {
        user: { ...user },
        logOut: this.logOut,
      },
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
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
      this.logOut();
    }
  }

  markNotificationAsRead(id) {
    this.setState((prevState) => ({
      listNotifications: prevState.listNotifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  }

  logIn(email, password) {
    this.setState((prevState) => ({
      value: {
        ...prevState.value,
        user: {
          email,
          password,
          isLoggedIn: true,
        },
      },
    }));
  }

  logOut() {
    this.setState((prevState) => ({
      value: {
        ...prevState.value,
        user: { ...user },
      },
    }));
  }

  render() {
    const { listNotifications, value } = this.state;
    const {
      displayDrawer,
      displayNotificationDrawer,
      hideNotificationDrawer,
    } = this.props;
    const { isLoggedIn } = value.user;

    return (
      <AppContext.Provider value={value}>
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
                <Login logIn={this.logIn} />
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
})(App);
