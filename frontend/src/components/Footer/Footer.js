import React from "react";
import useStyles from "./styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer
      className={classes.footer}
      position="static"
      color="inherit"
      raised
      elevation={5}
    >
      <div>
        <p>Copyrights 2023 &copy; ipatelakshat</p>
      </div>

      <div>
        <h4>Follow Me</h4>
      </div>
      <div>
        <a href="https://twitter.com/ipatelakshat">
          <TwitterIcon />
        </a>
        <a href="https://github.com/Akshat143">
          <GitHubIcon />
        </a>
        <a href="https://www.instagram.com/ipatelakshat/">
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
