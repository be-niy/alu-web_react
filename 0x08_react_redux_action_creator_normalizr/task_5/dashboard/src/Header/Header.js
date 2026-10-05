import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import AppContext from '../App/AppContext';

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

class Header extends React.Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <div className={css(styles.header)}>
        <img
          className={css(styles.logo)}
          src={holbertonLogo}
          alt="Holberton logo"
        />

        <h1>School dashboard</h1>

        {user.isLoggedIn && (
          <p id="logoutSection">
            Welcome <strong>{user.email}</strong> (
            <a
              href="#logout"
              className={css(styles.link)}
              onClick={(event) => {
                event.preventDefault();
                logOut();
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

Header.contextType = AppContext;

export default Header;
