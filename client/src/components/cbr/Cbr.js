import React, { useState, useEffect } from 'react'
import './Cbr.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../header/Header';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  }
}))


export default function Cbr() {
  const classes = useStyles();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([]);


  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={() => {
        alert("Test");
      }} color="primary" className={classes.button}>
        Click my Digital Wallet
    </Button>

    </div>
  )
}
