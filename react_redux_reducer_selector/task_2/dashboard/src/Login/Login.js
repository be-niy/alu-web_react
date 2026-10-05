import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '20px',
  },

  label: {
    marginRight: '5px',

    '@media (max-width: 900px)': {
      display: 'block',
      marginTop: '10px',
      marginRight: '0',
    },
  },

  input: {
    '@media (max-width: 900px)': {
      display: 'block',
      marginTop: '5px',
    },
  },

  button: {
    '@media (max-width: 900px)': {
      display: 'block',
      marginTop: '10px',
    },
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    if (this.state.enableSubmit) {
      this.props.logIn(this.state.email, this.state.password);
    }
  }

  handleChangeEmail(event) {
    const email = event.target.value;

    this.setState(
      { email },
      () => {
        this.setState({
          enableSubmit:
            this.state.email.length > 0 &&
            this.state.password.length > 0,
        });
      }
    );
  }

  handleChangePassword(event) {
    const password = event.target.value;

    this.setState(
      { password },
      () => {
        this.setState({
          enableSubmit:
            this.state.email.length > 0 &&
            this.state.password.length > 0,
        });
      }
    );
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>

        <form onSubmit={this.handleLoginSubmit}>
          <label className={css(styles.label)} htmlFor="email">
            Email:
          </label>

          <input
            className={css(styles.input)}
            id="email"
            type="email"
            value={email}
            onChange={this.handleChangeEmail}
          />

          <label className={css(styles.label)} htmlFor="password">
            Password:
          </label>

          <input
            className={css(styles.input)}
            id="password"
            type="password"
            value={password}
            onChange={this.handleChangePassword}
          />

          <input
            className={css(styles.button)}
            type="submit"
            value="OK"
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

export default Login;
