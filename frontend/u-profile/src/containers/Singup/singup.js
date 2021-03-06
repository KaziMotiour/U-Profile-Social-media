import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom'
import './singup.css'
import {Registration} from '../../store/actions/Auth'
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
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(0, 0, 1),
  },
}));

export default function Singup() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const registrationError = useSelector(state=> state.auth.registration_error)
  const regConfirmation = useSelector(state=>state.auth.registration_confirmation)
  // console.log(registrationError.email);
  const [registrationInfo, setRegistrationInfo] = useState({
    email:'',
    username:'',
    password:'',
    password2:''
  })

  const HandleInput = (e) =>{
    setRegistrationInfo(prevState =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const HandleSubmit = (e) =>{
    e.preventDefault()
    const {email, username, password, password2} = registrationInfo
    dispatch(Registration(email, username, password, password2))
  

  }

  useEffect(()=>{
    goToLogin()
  },[regConfirmation])
 
  async function goToLogin (){
    await new Promise((resolve) => setTimeout(() => { 
        if(regConfirmation){
          history.push({
            pathname: '/login',
            state: { detail: regConfirmation }
          })
        }
      
    }, 1000))

}



  return (
      <div className="login">
          <div className="tag">
              <h2>U-Profile.com</h2>
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
          Sign Up
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
          {registrationError &&  registrationError.email && <span style={{color:'red'}}>{registrationError.email}</span>}
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="username"
            type="username"
            id="username"
            onChange={e=> HandleInput(e)}
          />
          {registrationError &&  registrationError.username && <span style={{color:'red'}}>{registrationError.username}</span>}
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
          {registrationError &&  registrationError.password1 && <span style={{color:'red'}}>{registrationError.password1}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=> HandleInput(e)}
          />
          {registrationError &&  registrationError.password2 && <span style={{color:'red'}}>{registrationError.password2}</span>}<br/>
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
            <Grid item>
              <Link to='/login' variant="body2">
                {"Already have an account"}
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