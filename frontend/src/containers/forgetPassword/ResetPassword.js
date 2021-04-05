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
import {PasswordResetConfirm} from '../../store/actions/Auth'
import {useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import SnackBer from '../Home/Feed/Post/sharePost/SnackBer'

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

export default function ResetUserPassword() {


  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  const resetPasswordSuccess = useSelector(state => state.auth.resetPasswordSuccess)
  const resetPasswordFailed = useSelector(state => state.auth.resetPasswordFailed)
  const [tokenNull, setTokenNull] = useState(false)
  const [newPasswordNull, setNewPasswordNull] = useState(false)
  const [resetPasswordInfo, setResetPasswordInfo] = useState({
      token:'',
      newPassword:''
  })

  const config = { headers: { 
    'Content-Type':'application/json',
  }}


  const HandleSendEmail = (e) =>{
    e.preventDefault()
    let formData = new FormData()
    if(resetPasswordInfo.token==='' || resetPasswordInfo.newPasswordNull===''){

        {resetPasswordInfo.token===null && setTokenNull(true)}
        {resetPasswordInfo.newPasswordNull===null && setNewPasswordNull(true)}

    }else{

        formData.append('token', resetPasswordInfo.token)
        formData.append('password', resetPasswordInfo.newPassword)
        dispatch(PasswordResetConfirm(formData, config))

    }

}

useEffect(() => {
    {resetPasswordSuccess !==null && setResetPasswordInfo({token:'', newPassword:''})}
}, [resetPasswordSuccess])

  console.log(resetPasswordInfo);
    return (
    <div className="login">
    <div className="tag">
        <h2>U-Profile.com</h2>
      </div>
      <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Get the token value from you'r email address
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Token"
            label="Token from email"
            name="token"
            autoComplete="Token"
            autoFocus
            value={resetPasswordInfo.token}
            onChange={e => setResetPasswordInfo({...resetPasswordInfo, [e.target.name]:e.target.value.trim()})}
          />
          <span style={{color:'red'}} >{resetPasswordFailed && resetPasswordFailed.status && 'This Token is no longer avaiable'}</span>
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Passowrd"
            label="New Password"
            name="newPassword"
            autoComplete="newPassword"
            value={resetPasswordInfo.newPassword}
            autoFocus
            onChange={e => setResetPasswordInfo({...resetPasswordInfo,[e.target.name]:e.target.value.trim()})}
          />
          <span style={{color:'red'}} >{resetPasswordFailed && resetPasswordFailed.password && resetPasswordFailed.password}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ e => HandleSendEmail(e)}
          >
            Reset Password
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
    {resetPasswordSuccess==='OK' && <SnackBer open={true} success_info={resetPasswordSuccess} />}
    </div>
    </div>
  );
}