import React from 'react';
import AppContext from '../App/AppContext';
import { getFullYear, getFooterCopy } from '../utils/utils';
import './Footer.css';

function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <div>
          <p>
            Copyright {getFullYear()} - {getFooterCopy(true)}
          </p>

          {user.isLoggedIn && (
            <p>
              <a href="mailto:contact@holbertonschool.com">
                Contact us
              </a>
            </p>
          )}
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;
