import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { Avatar } from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {VerifyJwtToken} from '../../../../../store/actions/Auth'
import {SharePost} from '../../../../../store/actions/PostCrud'
import {NotificationCount} from '../../../../../store/actions/Utils'
import './SharePost.css'
import SnackBer from './SnackBer'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SharedPost(props) {
    const history = useHistory()
    const dispatch  = useDispatch()
    const sharePostInfo = localStorage.getItem('RePost')
    const [open, setOpen] = React.useState(props.open);
    const [sharePostContent, setSharepostContent] = useState('')
    
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}
      
    useEffect(()=>{
      dispatch(NotificationCount(config))
    },[])

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('RePost')
        props.hondleShareOpen()
    };

    const HandleSharePost =() =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()
        let formData = new FormData()
        formData.append('sharePostContent', sharePostContent)
        dispatch(SharePost(props.id, formData, config))
        setSharepostContent('')
        closeDialog()
  }

 
async function closeDialog (){
  await new Promise((resolve) => setTimeout(() => { 
      setOpen(false)
      localStorage.removeItem('RePost')
      props.hondleShareOpen()
  
  }, 3000))
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





console.log(props.loggedInUsername, props.id);
  return (
    <div className='sharePostForm'>
      <Dialog
         className='sharePostForm'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <div className="particular-post">
         <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={props.loggedInUserImage}/>
        </div>
      
        <div className="post__headerText">
            <h3> {props.loggedInUserFullname !=='None None'? props.loggedInUserFullname: props.loggedInUserUsername}
                
                <span className="post_username"> shareed </span> 
               {/* {parent.user.username} post */}{props.postUsername}'s post
            </h3 >
            {/* {timestamp.substr(0,10)} {timestamp.substr(10,6)} */}
        </div>
        </div>
         {/* Post header part ended */}
         {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
          <textarea
            className="Textarea"
            placeholder="What's your mind ?"
            value={sharePostContent}
            onChange={(e) => setSharepostContent(e.target.value)}
          ></textarea>
          </div>

          {/* parent post  */}
          <div style={{width:'100%',  height:'auto'}}> 
          <div className="particular-shared-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={props.postUserImage}/>
        </div>
      
        <div className="post__headerText">
            <h3>{props.postUserFullname !=='None None' ? props.postUserFullname: props.postUsername }
            
                <span className="post_username"> @  {props.postUsername}</span> 

            </h3 >
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p>  {props.content} </p>
          
          </div>
          {/* {parent.image && <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={parent.image} /> } */} 
          {props.image && (<img style={{width:'70%', height:"250px", marginLeft:'30px'}}  src={props.image} />)}
              
        </div>
      </div>
      <DialogActions className="buttons">
          <Button onClick={handleClose} color="primary" >
            Cancle
          </Button>
          <Button onClick={HandleSharePost} color="primary" variant="contained">
            share
          </Button>
          {sharePostInfo!==null && <SnackBer open={true} success_info={sharePostInfo} />}
        </DialogActions>
        </div>
        </div>
        </div>





       
      </Dialog>
    </div>
  );
}