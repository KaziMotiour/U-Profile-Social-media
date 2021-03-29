import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ProfileInfo from './profileInfo/ProfileInfo'
import ProfilePost from './profilePost/profilePost'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useHistory, useParams} from 'react-router-dom'
import {VerifyJwtToken} from '../../store/actions/Auth'
import {GetFollowerUser, GetFollowingUser, UserProfile} from '../../store/actions/UserProfile'
import {GetUserWonPostList} from '../../store/actions/PostCrud'
import Follower from './FollowerAndGallery/Follower'
import Following from './FollowerAndGallery/Following'
import Gallery from './FollowerAndGallery/gallery'
import UserInformation from './profilePost/UserInformation'

import Nav from '../../component/Nav'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:'100%',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            
          },
    },
    profileInfo:{
        width:'100%',
        margin:0,
        padding:0,
        
       
    },
    profilePost:{
        width:'100%',
        margin:0,
        padding:0,
        marginTop:20,
       
       
    }
  })
)

function ProfilePage() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const {username} = useParams()
    const [openGallery, setOpenGalley] = useState(false) 
    const [openFollwoing, setOpenFollwoing] = useState(false)
    const [openFollower, setOpenFollower] = useState(false)
    const [openTimeline, setOpenTimeline] = useState(true)
    const [openAbout, setOpenAbout] = useState(false)
    const followers = useSelector(state => state.user.followerUser)
    const followingUser = useSelector(state => state.user.followingUser)
    const userWonPost = useSelector(state => state.post.UserWonPost)
    const userProfile = useSelector(state => state.user.userProfile)
   
    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    useEffect(()=>{
        dispatch(VerifyJwtToken(config))
        
        
        dispatch(GetUserWonPostList(username, config))
        dispatch(UserProfile(username, config))
    },[])

    useEffect(()=>{
        checkAuthenticatin()
    },[])

    const HandleOpenGallery=()=>{
        setOpenGalley(true)
        setOpenFollwoing(false)
        setOpenFollower(false)
        setOpenTimeline(false)
        setOpenAbout(false)

    }
    const HandleOpenFollwoing=()=>{
        dispatch(GetFollowingUser(username, config))
        setOpenGalley(false)
        setOpenFollwoing(true)
        setOpenFollower(false)
        setOpenTimeline(false)
        setOpenAbout(false)
       
        
    }
    const HandleOpenFollower=()=>{
        dispatch(GetFollowerUser(username, config ))
        setOpenGalley(false)
        setOpenFollwoing(false)
        setOpenFollower(true)
        setOpenTimeline(false)
        setOpenAbout(false)
        
    }
    const HandleOpenTimeline=()=>{
        setOpenGalley(false)
        setOpenFollwoing(false)
        setOpenFollower(false)
        setOpenTimeline(true)
        setOpenAbout(false)
    }
    const HandleOpenAbout =()=>{
        setOpenGalley(false)
        setOpenFollwoing(false)
        setOpenFollower(false)
        setOpenTimeline(false)
        setOpenAbout(true)
    }


    const checkAuthenticatin =()=>{
        const access_token = localStorage.getItem('access_token')
        if(!access_token){
            history.push({
                pathname: '/login',
                state: { detail: 'session expired, Try to login again' }
              })
        }
      }
    return (
        <div className={classes.root}>
            <Nav />


            {/* profile info */}
            <div className={classes.profileInfo}>
            <ProfileInfo openTimelineOpen={HandleOpenTimeline} opneFollowers={HandleOpenFollower} opneFollowing={HandleOpenFollwoing} opneGallery={HandleOpenGallery} openAbout={HandleOpenAbout}/>
            </div>
            
            {/*  */}
            <div className={classes.profilePost}>
            {openTimeline && <ProfilePost  />}
            {openFollower && <Follower  followers={followers} userProfile={userProfile} />}
            {openFollwoing && <Following following={followingUser} userProfile={userProfile} />}
            {openGallery && <Gallery  useWonPost={userWonPost} userProfile={userProfile} />}
            {openAbout && <UserInformation  userInfo={userProfile}/> }
            </div>
            
            
        </div>
    )
}

export default ProfilePage
