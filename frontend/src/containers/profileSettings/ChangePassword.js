import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {ChangeUserPassword} from '../../store/actions/Auth'
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      justifyItems:'center',
      justifySelf:'center',
      margin:'auto',
      width:'100%',
      paddingTop:20,
      
      
    },
    
    forms:{
        marginBottom:10,
    },
    title:{
        width:'100%',
        textAlign:'center',
        fontSize:40,
        marginBottom:10,
        paddingBottom:5,
        borderBottom:'2px solid #EBECED'
    }

})
)

export default function ChangePassword() {

    const classes = useStyles()
    const dispatch=useDispatch()
    const [oldPasswordRequired, setOldPasswordRequired] = useState(false)
    const [newPasswordRequired, setNewPasswordRequired] = useState(false)

    const [inputData, setInputData] = useState({
        old_password:'',
        new_password:''
    })


    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}
    const HandleChangePassword = () =>{

        {inputData.old_password==='' && setOldPasswordRequired(true)}
        {inputData.new_password==='' && setNewPasswordRequired(true)}
        if (inputData.old_password !=='' && inputData.new_password !==''){
            let formData = new FormData();
            formData.append('old_password', inputData.old_password)
            formData.append('new_password', inputData.new_password)
            dispatch(ChangeUserPassword(formData, config))
        }
    }





  return (
    <div className={classes.root}>
      <div style={{margin:'auto', width:'100%'}}>
       <div className={classes.title}>
            Change Password
        </div>  
      <div style={{ justifyContent:'center', display:'flex',flexWrap:'wrap',  width:'100%'}}>
        <Grid   className={classes.forms} item sm={9} xs={10}>
          <TextField
            required
            id="country"
            name="oldPassword"
            label="Old Password"
            fullWidth
            autoComplete="shipping country"
            onChange={ e => setInputData({...inputData, old_password:e.target.value }) }
          />
          {oldPasswordRequired && <span style={{color:'red'}}>This is required</span>}
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
          <TextField
            required
            id="country"
            name="newPassword"
            label="New Password"
            fullWidth
            autoComplete="shipping country"
            onChange={ e => setInputData({...inputData,new_password:e.target.value }) }
          />
          {newPasswordRequired && <span style={{color:'red'}}>This is required</span>}
        </Grid>

        <Grid className={classes.forms} item sm={9}  xs={12}  style={{marginBottom:40, marginTop:20,}}>
        <Button onClick={HandleChangePassword} style={{backgroundColor:'rgb(66, 129, 245)'}} variant="contained" color="primary">
            Change password
        </Button>
        </Grid>

        

    </div>
      </div>
    </div>
  );
}


