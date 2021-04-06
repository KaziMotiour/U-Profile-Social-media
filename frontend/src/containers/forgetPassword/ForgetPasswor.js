import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './forgetPasswor.css'
import {SendResetEmail} from '../../store/actions/Auth'
import {useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

// allert 
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgetPassword() {


  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  const emailSendSuccess = useSelector(state => state.auth.emailSendSuccess)
  const emailSendFailed = useSelector(state => state.auth.emailSendFailed)

  const [email, setEmail] = useState()
  const [sendEmailSuccess, setSendEmailSuccess] = useState(false)

  const config = { headers: { 
    'Content-Type':'application/json',
  }}


  const HandleSendEmail = (e) =>{
    e.preventDefault()
    dispatch(SendResetEmail(email, config))
  }

useEffect(() => {

  {emailSendSuccess === "OK" && setEmail('')}
  {emailSendSuccess === "OK" && setSendEmailSuccess(true)}

}, [emailSendSuccess])

  return (
    <div className="login">
    <div className="tag">
        <h2>U-Profile.com</h2>
      </div>
      <div>

      <Collapse in={sendEmailSuccess}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSendEmailSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
        Email send successfully, Check you'r email to reset password
        </Alert>
      </Collapse>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter you'r Email Address
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value.trim())}
          />
          <span style={{color:'red'}} >{emailSendFailed && emailSendFailed}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ e => HandleSendEmail(e)}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Go back to Login.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </div>
    </div>
  );
}