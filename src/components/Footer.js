import React, { Fragment } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
const Footer = React.memo(() => {
  return (
    <Fragment>
      <div className="footer-name">
        <h2>
          Made by <mark>Chamod Gamage</mark>
        </h2>
      </div>

      <h1 className="h1">
        {' '}
        <a
          className="h0"
          href="https://github.com/chamod-gamage"
          target="_blank"
        >
          <GitHubIcon fontSize="inherit" />
        </a>{' '}
        <a
          className="h0"
          href="https://www.linkedin.com/in/chamod-gamage/"
          target="_blank"
        >
          <LinkedInIcon fontSize="inherit" />
        </a>{' '}
        <a
          className="h0"
          href="https://www.instagram.com/chamod.og/"
          target="_blank"
        >
          <InstagramIcon fontSize="inherit" />
        </a>{' '}
        <a
          className="h0"
          href="mailto: chamodgamage26@gmail.com"
          target="_blank"
        >
          <MailIcon fontSize="inherit" />
        </a>{' '}
      </h1>
    </Fragment>
  );
});

export default Footer;
