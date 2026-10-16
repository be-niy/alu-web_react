import React from 'react';
import { connect } from 'react-redux';
import { getFullYear, getFooterCopy } from '../utils/utils';
import './Footer.css';

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'),
});

export function Footer({ isLoggedIn }) {
  return (
    <div>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>

      {isLoggedIn && (
        <p>
          <a href="mailto:contact@holbertonschool.com">
            Contact us
          </a>
        </p>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Footer);
