import React, {useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";

import { BorderBottom } from '@material-ui/icons';
import {GetFollowerUser} from '../../../store/actions/UserProfile'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, NavLink} from 'react-router-dom'  
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        margin:'10px',
        marginTop:'50px',
        border:0,
        borderRadius:'10px',
        paddingBottom:'10px',
        backgroundColor:'rgb(240, 242, 245)',
        maxWidth:'80%',
        margin:'auto'


    },
    root2:{
        margin:'10px',
        marginTop:'10px',
        border:0,
        borderRadius:'10px',
        paddingBottom:'10px',
        backgroundColor:'rgb(240, 242, 245)',
        maxWidth:'80%',
        margin:'auto'


    },
    heading:{
        // textAlign:'center',
        marginLeft:'8%',
        marginRight:'5%',
        marginTop:'5%',
        fontSize:'20px',
        borderBottom:'2px solid rgb(200, 200, 200)',
        maxWidth:'90%',
    },
    gallery:{
       
        marginLeft:'8%',
        marginTop:10,
        margin:20,
        display:'flex',
        flex:'wrap',
        
    },
    sociallink:{
        marginLeft:'8%',
        marginTop:10,
        margin:20,
        
    },
    icon:{
        color:'rgb(63, 81, 181)',
    },
    image:{
        width:50,
        height:50,
        margin:5,
        borderRadius:10,

    },
    avater:{
        width:theme.spacing(5),
        height:theme.spacing(5)
    }
    


  })
)



function DemoGallery({usePost, userInfo}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const follower = useSelector(state => state.user.followerUser)
    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    useEffect(()=>{
       {userInfo && dispatch(GetFollowerUser(userInfo.username, config))}
    },[userInfo])
    
    return (
        <div>
            <div className={classes.root}>
                <div className={classes.heading} > 
                   Recent Picture
                </div>

                {/* UserInfo */}
                <div className={classes.gallery}>
                    {usePost && usePost.slice(0, 5).map(post =>(
                       <span>{post.image && <a href={post.image}>   <img className={classes.image} src={post.image} /> </a>} </span>
                    ))}
                
                </div>
            </div>

            {/* social links */}
            <div className={classes.root2}>
                <div className={classes.heading} > 
                    Followers
                </div>
                <div className={classes.sociallink}>
                   {follower && follower.slice(0,5).map(user =>(
                       <div style={{display:'flex'}}>
                            
                           <Avatar src={user.profile.image} className={classes.avater}/> &nbsp;
                           <Link component={NavLink}  underline="none"  to={`/profile/${user.username }`}>
                           {user.full_name !=='None None' ? user.full_name: user.username}
                           </Link>
                       </div>

                   ))} 
                   
                
                </div>
            </div>
            

        </div>
    )
}

export default DemoGallery
