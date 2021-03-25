import React, {useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Button from '@material-ui/core/Button';

import {UserProfile, UserFollow} from '../../../store/actions/UserProfile'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

   
    
    coverPic:{
        minWidth:'55%', 
        maxWidth:'60%',
        margin:'auto',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '90%',
            maxWidth:'90%',
            
          },  
    },

    UserInfo:{
        width:'70%',
        maxWidth:'800px',
        height:'50px',
        backgroundColor:'rgb(245, 245, 245)',
        justifyContent:'space-between',
        margin:'auto',
        display:'flex',
       
        alignItems:'center',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            
            width: '100%',
            
          },
    },
    UserInfo2:{
        width:'70%',
        maxWidth:'800px',
        height:'50px',
        backgroundColor:'rgb(245, 245, 245)',
        justifyContent:'center',
        margin:'auto',
        display:'flex',
       
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
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: '100px',
            height: '100px',
            
          },
      },
      flex:{
        display:'flex'
      },
      menusItems:{
          marginRight:15,
          padding:3,
          cursor:'pointer',
          '&:hover':{
              borderBottom:'.5px solid rgb(64, 81, 181)'
          },
          ['@media (max-width: 500px)']: { // eslint-disable-line no-useless-computed-key
            marginRight:8,
            fontSize:13,
            
          },
      },
      follow:{
          marginRight:50,
          
          ['@media (max-width: 500px)']: { // eslint-disable-line no-useless-computed-key
            marginRight:20,
            
          },
      },
      userName:{
          fontSize:22,
          ['@media (max-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            fontSize:20,
            
          },
      },

      menusItemsAbout:{
        marginRight:15,
        padding:3,
        cursor:'pointer',
        '&:hover':{
            borderBottom:'.5px solid rgb(64, 81, 181)'
        },
        ['@media (min-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            display:'none'
            
          },
        ['@media (max-width: 500px)']: { // eslint-disable-line no-useless-computed-key
            marginRight:8,
            fontSize:13,
            
          },
      },
      image:{
        maxHeight:'300px',
        width:'100%',
        ['@media (min-width: 1500px)']: { // eslint-disable-line no-useless-computed-key
            maxHeight:'450px',
          },
          ['@media (max-width: 500px)']: { // eslint-disable-line no-useless-computed-key
            maxHeight:'250px',
          },
      },
      followButton:{
          borderRadius:20,
      }
      
      
    
  })
)

function ProfileInfo({openTimelineOpen, opneFollowers, opneFollowing, opneGallery}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {username} = useParams()
    const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
    const userProfile = useSelector(state => state.user.userProfile)

    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    

    useEffect(()=>{
        dispatch(UserProfile(username, config))
    },[])
    
    const FollowOrUnfollow  = () =>{
        const profile=true 
        const username = userProfile.username
        dispatch(UserFollow(username, username, config,  profile,))
    }
    return (
        <div className={classes.profileInfo}>

            <div className={classes.coverPic}>
                <img  className={classes.image}   
                src={userProfile ? userProfile.profile.cover_picture : ''} /> 
            </div>
            
            <div className={classes.UserInfo}>

                <div className={classes.flex}>
                    <div>
                        <Avatar src={userProfile ? userProfile.profile.image: ''} className={classes.large}/>
                    </div>
                    <div className={classes.userName}>
                        {userProfile ? userProfile.full_name!=='None None' ? userProfile.full_name : userProfile.username :''}
                    </div>
                </div>

                <div className={classes.follow}>
                    {userProfile && userProfile.profile.is_following ? <Button onClick={FollowOrUnfollow} className={classes.followButton}   variant="outlined" color="primary">Unfollow</Button> 
                    :
                    <Button onClick={FollowOrUnfollow} className={classes.followButton} variant="outlined" color="primary">
                    Follow </Button>}
                </div>

            </div>


            <div className={classes.UserInfo2}>

                <div className={classes.menu}>
                   
                 <div className={classes.flex}>
                 <p className={classes.menusItems} onClick={openTimelineOpen}> Timeline </p>

                    <p className={classes.menusItems} onClick={opneFollowing}>Following ({userProfile && userProfile.profile.following})</p>

                    <p className={classes.menusItems}  onClick={opneFollowers}>Follower ({userProfile && userProfile.profile.followed_by})</p>

                    <p className={classes.menusItems} onClick={opneGallery}>Gallery</p>

                    <p className={classes.menusItemsAbout} >About</p>
                   
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default ProfileInfo
