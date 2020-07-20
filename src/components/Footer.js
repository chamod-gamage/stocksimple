import React, { Fragment } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
const Footer = React.memo(() => {

    return(
      <Fragment>
          <div style = {{height: 20}}/>
        <h2>
        Made by  <mark>Chamod Gamage</mark>
      </h2>
      <div style = {{height: 20}}/>

      <h1 className = "h1">
    
      {"\u0020"}
      <a className = "h0" href = "https://github.com/chamod-gamage" target = "_blank"><GitHubIcon fontSize = "inherit"/></a>
      {"\u0020"}
      <a className = "h0" href = "https://www.linkedin.com/in/chamod-gamage/" target = "_blank"><LinkedInIcon fontSize = "inherit"/></a>
      {"\u0020"}
      <a className = "h0" href = "https://www.instagram.com/chamod.og/" target = "_blank"><InstagramIcon fontSize = "inherit"/></a>
      {"\u0020"}
      <a className = "h0" href = "mailto: chamodgamage26@gmail.com" target = "_blank"><MailIcon fontSize = "inherit"/></a>
      {"\u0020"}

      </h1>
      </Fragment>
      
    )
  })

  export default Footer;