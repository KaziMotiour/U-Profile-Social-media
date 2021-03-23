import React, {useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import {UserProfile} from '../../../store/actions/UserProfile'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coverPic:{
        width:'70%', 
        maxWidth:'800px',
        margin:'auto',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '90%',
            
          },  
    },

    pofileInfo:{
        width:'65%',
        height:'50px',
        backgroundColor:'rgb(235, 236, 237)',
        margin:'auto',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            
          },
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginLeft:20,
        marginTop:-80,
      },
      abouts:{
        display:'flex'
      },
      aboutItems:{
          marginRight:15,
          padding:3,
          cursor:'pointer',
          '&:hover':{
              borderBottom:'.5px solid rgb(64, 81, 181)'
          }
      }
    
  })
)

function ProfileInfo() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {username} = useParams()
    const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
    const userProfile = useSelector(state => state.user.userProfile)
    console.log(username, 'usernameee');
    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
   
    useEffect(()=>{
        dispatch(UserProfile(username, config))
    },[])
    
    console.log(userProfile && userProfile, 'dddddddddddddddddddddd');



    return (
        <div className={classes.profileInfo}>

            <div className={classes.coverPic}>
                <img  className={classes.image} style={{maxHeight:'300px', width:'100%'}}  
                src={userProfile ? userProfile.profile.cover_picture : ''} /> 
            </div>
            
            <div className={classes.pofileInfo}>

                <div>
                 <Avatar src={userProfile ? userProfile.profile.image: ''} className={classes.large}/>
                </div>

                <div className={classes.abouts}>
                    <h4 className={classes.aboutItems}>following {userProfile && userProfile.profile.following}</h4>
                    <h4 className={classes.aboutItems}>follower {userProfile && userProfile.profile.followed_by}</h4>
                    <h4 className={classes.aboutItems}>hello</h4>
                </div>

                <div className={classes.abouts}>
                {userProfile && userProfile.profile.is_following ? <h4 >UnFollow</h4>:<h4 >follow</h4>}
                    
                </div>
            </div>

            
        </div>
    )
}

export default ProfileInfo
