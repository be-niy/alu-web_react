import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { logout } from '../actions/uiActionCreators';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },

  logo: {
    height: '40vmin',
    pointerEvents: 'none',
  },

  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'white',
  },
});

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'),
  user: state.ui.get('user'),
});

export class Header extends React.Component {
  render() {
    const { isLoggedIn, user, logout } = this.props;

    return (
      <div className={css(styles.header)}>
        <img
          className={css(styles.logo)}
          src={holbertonLogo}
          alt="Holberton logo"
        />

        <h1>School dashboard</h1>

        {isLoggedIn && (
          <p id="logoutSection">
            Welcome <strong>{user.email}</strong> (
            <a
              href="#logout"
              className={css(styles.link)}
              onClick={(event) => {
                event.preventDefault();
                logout();
              }}
            >
              logout
            </a>
            )
          </p>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, { logout })(Header);
