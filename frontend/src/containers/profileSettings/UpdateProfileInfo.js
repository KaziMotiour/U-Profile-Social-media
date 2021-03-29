import React, {useEffect, useState} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Nav from '../../component/Nav'
import ProfileSettings from './ProfileSettings'
import ChangePassword from './ChangePassword'
import ChangeProfilePicture from './ChangeProfilePicture'
import {useDispatch, useSelector} from 'react-redux'
import {UserProfile, UserFollow, LoggedUserInfo} from '../../store/actions/UserProfile'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root:{
        display:'flex',
        flexDirection:'column'
      },

      body:{
        display:'flex',
        
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: 'column',    
          },
      },

      sideNav:{
          flex:.7,
          display:'flex',

       
          paddingTop:15,
          borderRight:'2px solid #EBECED',
          ['@media (min-width: 921px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: 'column',
          },
          
          ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
           
            flexDirection: 'column',
            paddingBottom:10,  
          },
      },

      UpdateInfo:{
          flex:2,
          width:'100%',
          borderLeft:'2px solid #EBECED',
      },

      button:{
          width:200,
          margin:10,
          ['@media (min-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            marginLeft:'auto', 
          },
          
          ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key 
            margin:'auto',
            marginTop:8,
          },
      },
  })
)

function UpdateProfileInfo() {

    const classes = useStyles() 
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
    const userProfile = useSelector(state => state.user.userProfile)
    const [openProfileSettings, setOpenProfileSettings]=useState(true)
    const [openProfilePictureChange, setOpenProfilePictureChange]=useState(false)
    const [openChangePassword, setOpenChangePassword]=useState(false)

    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}

    useEffect(()=>{
        dispatch(LoggedUserInfo(config))
    },[])

    useEffect(()=>{
       {loggedInUser && dispatch(UserProfile( loggedInUser.username, config)) } 
    },[loggedInUser])

    const handleOpenChangePassowrdForm = () =>{
        setOpenChangePassword(true)
        setOpenProfileSettings(false)
        setOpenProfilePictureChange(false)
    }
    const handleOpenProfileSettings = () =>{
        setOpenChangePassword(false)
        setOpenProfilePictureChange(false)
        setOpenProfileSettings(true)
    }

    const handleOpenProfilePricturChange = () =>{
      setOpenChangePassword(false)
      setOpenProfileSettings(false)
      setOpenProfilePictureChange(true)
  }

    return (
        <div className={classes.root}>
            <Nav />
            <div className={classes.body}>
            <div className={classes.sideNav}>
              
                <Button onClick={handleOpenProfileSettings} className={classes.button} variant="contained" color="primary">
                   profile info
                </Button>
                <Button onClick={handleOpenProfilePricturChange} className={classes.button} variant="contained" color="primary">
                       profile picture
                </Button>
                <Button onClick={handleOpenChangePassowrdForm} className={classes.button} variant="contained" color="primary">
                     Change password
                </Button>
              

            </div>
            <div className={classes.UpdateInfo}>
               {openProfileSettings && userProfile && <ProfileSettings  userInfo={userProfile} />}
              { openChangePassword &&  < ChangePassword />}
              {openProfilePictureChange && <ChangeProfilePicture  userInfo={userProfile}/>}
            </div>
            </div>
        </div>
    )
}

export default UpdateProfileInfo
