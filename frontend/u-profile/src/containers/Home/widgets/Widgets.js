import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import {useDispatch,  useSelector} from 'react-redux'
import {RecomendedUser, UserFollow, MutualFriend} from '../../../store/actions/UserProfile'
import UserList from '../Feed/Post/userList/UserList'

import "./Widgets.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 91,
    maxHeight:200,
    margin:5,
  },
  media: {
    height: 60,
  },
  username:{
    fontSize:'10px',
    fontWeight:'bolder',
    color:'black'
  },
  mutualFriend:{
    cursor:'pointer',
    fontSize:'10px',
    color:'rgb(46, 46, 45)',
    "&:hover":{
      borderBottom:'1px solid grey',
      color:'rgb(125, 37, 37)',
      
    },
  },
  flex:{
     display:'flex',
     flexDirection:'column', 
     marginTop:'auto'

      
  }
  
});

function Widgets() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const recomendedUser = useSelector(state => state.user.recomendedUser)
  const mutualFriend = useSelector(state => state.user.mutualFriend)
  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
  }}

  useEffect(()=>{
    
    dispatch(RecomendedUser(config))
  },[])

  const HandleUserFollow = (username) =>{
        dispatch(UserFollow(username, config))
  }
  const RefreshRecomendedUser = () =>{
    dispatch(RecomendedUser(config))
  }
  const HnadleMutualFriend = (id) =>{
    console.log(id,'id');
    dispatch(MutualFriend(id, config))
  }

  console.log(mutualFriend,'widgets');

  return (
    <div className="widgets">
      <div className="Top" style={{display:'flex', justifyContent:'space-around'}}>
        <h3>Pepole may you know</h3> 
        <RefreshIcon style={{cursor:'pointer', color:'blue'}} onClick={RefreshRecomendedUser} />
      </div>   
      <br/>
       <div className="" style={{display:'flex', flexWrap:'wrap'}}>
       
       {recomendedUser.length !==0 && (recomendedUser.map(user =>(

         <Card className={classes.root}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={user.profile.image}
             title=''
           />
           <CardContent>
           {user.full_name ==='None None' ? (
             <Typography gutterBottom className={classes.username} >
             { user.username}
             </Typography>):(
             <Typography   color="textSecondary" component="p" className={classes.username}>
               {user.full_name}
             </Typography>)}
             
           </CardContent>
         </CardActionArea>
         <CardActions className={classes.flex}>
         {user.mutual_friends!==0 && <Typography color="textSecondary" component="p" c>
              <p className={classes.mutualFriend} onClick={() => HnadleMutualFriend(user.id)} > Mutual friend {user.mutual_friends}</p>
          {mutualFriend.length !==0 && (<UserList opene={true} mutualFriendList={mutualFriend}/>)}
         </Typography>}
           <Button size="small" color="primary" onClick={()=> HandleUserFollow(user.username)}>
             Follow
           </Button>
           
         </CardActions>
       </Card>

       )))}
        
    
    </div>
       
        
      </div>
  );
}

export default Widgets;
