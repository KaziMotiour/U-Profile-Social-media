import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// allert 
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// end allert 

import './login.css'
import {UserLogin} from '../../store/actions/Auth'
import {useHistory, useParams } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function Login() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.auth.access_token)
  const loginError = useSelector(state => state.auth.login_error)

  const [openAlert, setOpenAlert] = React.useState(false);
  let cmMessage = null
  if (history.location.state){
    cmMessage=history.location.state.detail
  }

  const [loginInfo, setLoginInfo] = useState({
    email:'',
    password:''
  })

  const HandleInput = (e) =>{
    setLoginInfo(prevState =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const HandleSubmit = (e) =>{
    e.preventDefault()
    const {email, password} = loginInfo
    dispatch(UserLogin(email, password))
    goToHome()

  }
  async function goToHome (){
    await new Promise((resolve) => setTimeout(() => { 
        const access_token = localStorage.getItem('access_token') 
        if(access_token){
            history.push('/')
        }
      
    }, 1000))
}
useEffect(() =>{
  showAlert()
},[cmMessage])

async function showAlert (){
  await new Promise((resolve) => setTimeout(() => { 
      if(cmMessage){
        setOpenAlert(true)
      }
    
  }, 1000))
}


  return (
      <div className="login">
          <div className="tag">
              <h2>U-Profile.com</h2>
            </div>
          <div className="allert">
          <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {cmMessage}
        </Alert>
      </Collapse>
          </div>

          <div className="login-body">
          <div className='logo'>
            <img src="https://icdn2.digitaltrends.com/image/digitaltrends/social-media-history-large-header-768x768.png" alt="Italian Trulli" />
          </div>
          <div  className='form'>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            autoFocus
            onChange={e=> HandleInput(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=> HandleInput(e)}
          />
          {loginError && <span style={{color:'red'}}>{loginError}, provide you'r correct email and password.</span>}<br/>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={HandleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgetpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/singup' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    </div>
    </div>
    </div>
  );
}