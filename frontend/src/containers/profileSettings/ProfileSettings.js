import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {UserProfile, UserFollow, LoggedUserInfo, EditUserProfile} from '../../store/actions/UserProfile'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SnackBer from '../Home/Feed/Post/sharePost/SnackBer'

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
    },
    editButton:{
        backgroundColor:'rgb(66, 129, 245)', float:'right', marginRight:20,
    },
    lavelName:{
        marginBottom:10,
    }

})
)

export default function ProfileSettings({userInfo}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
    const ProfileUpdateError = useSelector(state => state.user.userUpdateFail)
    const ProfileUpdateSuccess = useSelector(state => state.user.userUpdateSuccess)

    

    const [openEdit, setOpenEdit] = useState(false)

    const [profileInfo, setProfileInfo] = useState({
       first_name: userInfo.profile.first_name,
       Last_name: userInfo.profile.Last_name,
       bio : userInfo.profile.bio,
       occupation: userInfo.profile.occupations,
       gander : userInfo.profile.gander,
       relationship_status: userInfo.profile.relationship_status,
       location:userInfo.profile.location,
       phone: userInfo.profile.Phone,
       facebook_Link: userInfo.profile.facebook_Link,
       twitter_link: userInfo.profile.twitter_link,
       linkdin_link: userInfo.profile.linkdin_link,
       github_link: userInfo.profile.github_link, 
    })
    console.log(profileInfo.github_link, 'githubbbb');
    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}
    useEffect(()=>{
        dispatch(LoggedUserInfo(config))
    },[])

    const HandleUpdatePost = ()=>{
     
        let formData = new FormData();
       { formData.append("first_name", profileInfo.first_name); }
        {profileInfo.Last_name !==null &&  formData.append("Last_name", profileInfo.Last_name); }
        {profileInfo.bio  !==null && formData.append("bio", profileInfo.bio); }
        {profileInfo.occupation !==null  && formData.append("occupations", profileInfo.occupation);}
        {profileInfo.gander !==null  && formData.append("gander", profileInfo.gander); }
        {profileInfo.relationship_status !==null  && formData.append("relationship_status", profileInfo.relationship_status); }
        {profileInfo.location !==null  && formData.append("location", profileInfo.location); }
        {profileInfo.phone !==null  && formData.append("Phone", profileInfo.phone); }
        {profileInfo.facebook_Link !==null  && formData.append("facebook_Link", profileInfo.facebook_Link);}
        {profileInfo.twitter_link !==null  && formData.append("twitter_link", profileInfo.twitter_link); }
        {profileInfo.linkdin_link !==null  && formData.append("linkdin_link", profileInfo.linkdin_link); }
        {profileInfo.github_link !==null  && formData.append("github_link", profileInfo.github_link); }

        dispatch(EditUserProfile(userInfo.profile.id, userInfo.username,  formData, config ))
        
    }

    useEffect(()=>{
      {ProfileUpdateSuccess===true && setOpenEdit(false)}

  },[ProfileUpdateSuccess])

  return (
    <div className={classes.root}>
      <div style={{margin:'auto', width:'100%'}}>
       <div className={classes.title}>
            Profile Info
        </div>  
        <div style={{width:'100%'}}>
       <Button onClick={()=> setOpenEdit(!openEdit)} className={classes.editButton} variant="contained" color="primary">
            Edit Profile
        </Button>
        </div>

      <div style={{ justifyContent:'center', display:'flex',flexWrap:'wrap',  width:'100%'}}>
      

          
        <Grid   className={classes.forms} item xs={10} sm={4}   style={{marginRight:30}} >
           {!openEdit && <p className={classes.lavelName}> First Name: {userInfo && userInfo.profile.first_name} </p>}
          {openEdit && <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            value={profileInfo.first_name}
            fullWidth
            autoComplete="family-name"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}

          />}
        </Grid>

            <Grid   className={classes.forms} item  sm={4} xs={10}>
            {!openEdit && <p className={classes.lavelName}> Last Name: {userInfo && userInfo.profile.Last_name}</p>}
           {openEdit && <TextField

            id="Last_Name"
            name="Last_name"
            label="Last Name"
            value={profileInfo.Last_name}
            fullWidth
            autoComplete="family-name"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>
        <Grid   className={classes.forms} item  sm={9} xs={10}>
        {!openEdit && <p> Bio: {userInfo && userInfo.profile.bio}</p>}
        {openEdit && <TextField  value={profileInfo.bio} id="Bio" name="bio" label="Bio" 
        onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
        fullWidth />}
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Occupations: {userInfo && userInfo.profile.occupations}</p>}
           {openEdit && <TextField

            id="occupation"
            name="occupation"
            label="Occupations"
            value={profileInfo.occupation}
            fullWidth
            autoComplete="shipping address-line1"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Gander: {userInfo && userInfo.profile.gander}</p>}
           {openEdit && <TextField
            id="gander"
            name="gander"
            label="Gender"
            value={profileInfo.gander}
            fullWidth
            autoComplete="shipping address-line2"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Relationship Status: {userInfo && userInfo.profile.relationship_status}</p>}
           {openEdit && <TextField
            id="relationship_status"
            name="relationship_status"
            label="Relationship Status"
            value={profileInfo.relationship_status}
            fullWidth
            autoComplete="shipping address-level2"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>

        <Grid   className={classes.forms} item  sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}>Location: {userInfo && userInfo.profile.location}</p>}
           {openEdit && <TextField
            id="location"
            name="location"
            label="Locatoin"
            value={profileInfo.location}
            fullWidth
            autoComplete="shipping postal-code"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
        
        {!openEdit && <p className={classes.lavelName}> Phone: {userInfo && userInfo.profile.Phone}</p>}
           {openEdit && <TextField
            value={profileInfo.phone}
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="shipping country"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />}
        </Grid>

        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Linkdin: {userInfo && userInfo.profile.linkdin_link}</p>}
           {openEdit && <div> <TextField
            id="linkdin_link"
            name="linkdin_link"
            label="Linkdin Profile"
            value={profileInfo.linkdin_link}
            fullWidth
            autoComplete="shipping country"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />
          <span style={{color:'red'}}>{ProfileUpdateError && ProfileUpdateError.linkdin_link && ProfileUpdateError.linkdin_link.linkdin }</span>
          </div>
          }
        </Grid>
        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> GitHub: {userInfo && userInfo.profile.github_link}</p>}
           {openEdit && <div><TextField
            id="github_link"
            name="github_link"
            label="GitHub Profile"
            value={profileInfo.github_link}
            fullWidth
            autoComplete="shipping country"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />
          <span style={{color:'red'}}>{ProfileUpdateError && ProfileUpdateError.github_link && ProfileUpdateError.github_link.github }</span>
          </div>}
        </Grid>

        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Facebook : {userInfo && userInfo.profile.facebook_Link} </p>}
           {openEdit && <div> <TextField
            id="facebook_Link"
            name="facebook_Link"
            label="Facebook profile"
            value={profileInfo.facebook_Link}
            fullWidth
            autoComplete="shipping country"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />
          <span style={{color:'red'}}>{ProfileUpdateError && ProfileUpdateError.facebook_Link && ProfileUpdateError.facebook_Link.facebook }</span>
          </div>}
        </Grid>

        <Grid   className={classes.forms} item sm={9} xs={10}>
        {!openEdit && <p className={classes.lavelName}> Twitter : {userInfo && userInfo.profile.twitter_link}</p>}
           {openEdit && <div><TextField
            id="twitter_link"
            name="twitter_link"
            label="Twitter Profile"
            value={profileInfo.twitter_link}
            fullWidth
            autoComplete="shipping country"
            onChange={e => setProfileInfo({...profileInfo, [e.target.name]:e.target.value})}
          />
            <span style={{color:'red'}}>{ProfileUpdateError && ProfileUpdateError.twitter_link && ProfileUpdateError.twitter_link.twitter }</span>
          </div>
           }

        </Grid>

        <Grid className={classes.forms} item sm={9}  xs={12}  style={{marginBottom:40, marginTop:20,}}>
        {openEdit &&<div> <Button onClick={()=> setOpenEdit(false)}  style={{backgroundColor:'rgb(171, 46, 38)', marginRight:10,}} variant="contained" color="primary">
        cancle
        </Button>

        <Button onClick={HandleUpdatePost} style={{backgroundColor:'rgb(66, 129, 245)'}} variant="contained" color="primary">
           
           Update Profile
        </Button>

        </div>
        
        }
        </Grid>
        
        {ProfileUpdateSuccess===true && <SnackBer open={true} success_info="profile_updated"/>}
        

    </div>
      </div>
    </div>
  );
}


