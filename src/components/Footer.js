import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Footer = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://nickteojs.github.io" target="_blank">
          Built by Nick Teo
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Footer
