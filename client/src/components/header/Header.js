import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  toolImg: {
    marginRight: theme.spacing(0),
  },
  appDiv: {
    marginButtom: theme.spacing(0)
  },
  toolMain: {
    background: "white"
  },
  typography: {
    flexGrow: 1,
    align: "right"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  }
}))


export default function Header() {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (

    <AppBar position="absolute" className={classes.toolMain}>
      <Toolbar variant="regular">
        <img src={require('../../images/cbr.jpg')} alt="cbr" width="100" className={classes.toolImg} />
        <Typography className={classes.typography}>

        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="blue"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>About</MenuItem>
            <MenuItem onClick={handleClose}>Add Customer</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
   
  )
}
