import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, NavLink} from 'react-router-dom'  
import { Avatar } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {UserFollow} from '../../../store/actions/UserProfile'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      follower:{
          width:'50%',
          maxWidth:700,
          margin:'auto',
          marginTop:50,
          marginBottom:100,
          borderLeft:'1px solid #EBECED',
          borderRight:'1px solid #EBECED',
          ['@media (max-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            
           width:550,
            
          },
          ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            
            width: '100%',
            
          },
      },
      title:{
          fontSize:40,
          textAlign:'center',
          
      },
      userList:{
          display:'flex',
          flexWrap:'wrap',
          marginTop:30,
        
         
          
      },
      userListItem:{
          display:'flex',
          width:'45%',
          padding:10,
          ['@media (max-width: 450px)']: { // eslint-disable-line no-useless-computed-key
            
            width: '100%',
            marginLeft:20,
            marginRight:20,
          },
          
      },
      avater:{
        width:theme.spacing(7),
        height:theme.spacing(7)
      },
      followButton:{
          width:90,
          height:35,
          marginLeft:'auto'
      }
  }))

function Follower({followers, userProfile}) {
    const classes = useStyles()
    const dispatch =  useDispatch()

    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    const FollowOrUnfollow  = (username) =>{

        dispatch(UserFollow(username, userProfile.username, config))
    }

    return (
        <div className={classes.follower}>
            <div className={classes.title}>
                Followers
            </div>
            <div className={classes.userList} >
                {followers.length!==0  && followers.map(user =>(
                    <div className={classes.userListItem}>
                        <Avatar src={user.profile.image} className={classes.avater}/> &nbsp;
                        <Link component={NavLink}  underline="none"  to={`/${user.username }`}>
                           {user.full_name !=='None None' ? user.full_name: user.username}
                        </Link>
                           <Button onClick={()=> FollowOrUnfollow(user.username)} className={classes.followButton} variant="outlined" color="primary">{user.is_following? 'UnFollow':'Follow'}  </Button>
                    </div>
                ))}
                

            </div>
        </div>
    )
}

export default Follower
