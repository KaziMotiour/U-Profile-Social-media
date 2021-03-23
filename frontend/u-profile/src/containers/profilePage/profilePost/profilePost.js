import React,{useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Post from '../../Home/Feed/Post/Post'
import Media from '../../Home/Feed/Post/LoadPost'
import UserInformation from './UserInformation'
import {useDispatch, useSelector} from 'react-redux'
import {GetPostList, GetUserWonPostList} from '../../../store/actions/PostCrud'
import {UserProfile} from '../../../store/actions/UserProfile'
import {useParams} from 'react-router-dom'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    profilePosts:{
        width:'100%',
        display:'flex',
        margin:'auto',
        

    },
    userInfo:{
        flex:1,
        ['@media (max-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none',
            
            
          },
    },
    userPost:{
        width:'100%',
        flex:2,
        borderLeft:'1px solid #EBECED',
        borderRight:'1px solid #EBECED',
    },
    userImages:{
        flex:1,
        ['@media (max-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none',
            
          },
        
    },
  })
)





function ProfilePost() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allPost = useSelector(state => state.post.UserWonPost)
    const userProfile = useSelector(state => state.user.userProfile)
    const {username} = useParams()
    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}

    useEffect(()=>{
      dispatch(GetUserWonPostList(username, config))
      dispatch(UserProfile(username, config))
  
  },[])
    
    const userposts = allPost && allPost.map(post=>(
        <Post 
          key={post.id}
          id={post.id}
          parent={post.parent}
          user={post.user} 
          content ={post.content}
          image={post.image}
          privacy={post.privacy}
          is_retweet={post.is_retweet}
          is_saved={post.is_saved}
          likes={post.likes}
          postComment = {post.postComment}
          timestamp = {post.timestamp}
          is_liked = {post.is_liked}
          shared_user = {post.shared_user}
          username={username}
          />
      ))
    return (
        <div className={classes.profilePosts}>
            <div className={classes.userInfo}> 
           <UserInformation userInfo={userProfile} />
            </div>

            <div className={classes.userPost}>
            {allPost && allPost.length !==0 ? userposts : (<Media />) }
            </div>

            <div className={classes.userImages}>
            hello
            </div>
            
        </div>
    )
}

export default ProfilePost
