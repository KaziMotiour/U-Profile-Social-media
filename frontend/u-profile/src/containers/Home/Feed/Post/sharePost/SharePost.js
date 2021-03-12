import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { Avatar } from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {VerifyJwtToken} from '../../../../../store/actions/Auth'
import {SharePost} from '../../../../../store/actions/PostCrud'
import './SharePost.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SharedPost(props) {
    
    const history = useHistory()
    const dispatch  = useDispatch()
    const [open, setOpen] = React.useState(props.open);
    const [sharePostContent, setSharepostContent] = useState('')
    
    const handleClose = () => {
        setOpen(false);
    };

    const HandlePrivacyChange =() =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()
   
        const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
        }}
        let formData = new FormData()
        formData.append('sharePostContent', sharePostContent)
        dispatch(SharePost(props.id, formData, config))
        setSharepostContent('')
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
            <h3> {props.loggedInUsername}
                
                <span className="post_username"> share's </span> 
               {/* {parent.user.username} post */}{props.postUsername} post
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
            <h3>{props.postUserFullname}
            
                <span className="post_username"> @  {props.postUsername}</span> 

            </h3 >
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p>  {props.content} </p>
          
          </div>
          {/* {parent.image && <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={parent.image} /> } */} 
          <img style={{width:'70%', height:"250px", marginLeft:'30px'}}  src={props.image} />
              
        </div>
      </div>
      <DialogActions className="buttons">
          <Button onClick={handleClose} color="primary" >
            Cancle
          </Button>
          <Button onClick={HandlePrivacyChange} color="primary" variant="contained">
            Share
          </Button>
        </DialogActions>
        </div>
        </div>
        </div>

       
      </Dialog>
    </div>
  );
}