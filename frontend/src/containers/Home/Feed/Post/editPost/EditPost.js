import React,{useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import { Avatar } from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {VerifyJwtToken} from '../../../../../store/actions/Auth'
import {NotificationCount} from '../../../../../store/actions/Utils'
import {EditPost} from '../../../../../store/actions/PostCrud'
import './editPost.css'
import SnackBer from '../sharePost/SnackBer'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
    semiLarge:{
        width: theme.spacing(5),
        height: theme.spacing(5),
        color:'rgb(161, 166, 162)',
        cursor:'pointer',
        zIndex:'1',
    },
    cancelIcon:{
        cursor:'pointer', 
        marginLeft:'75%', 
        marginBottom:'-10px', 
        zIndex:'1',
    
    
    },
    img:{
        width:'90%',
        height:"300px", 
        marginLeft:'30px', 
        
    }
  }))

export default function EditPosts({open, id, username, parent, postUsername, postUserFullname, postUserImage, content, image, loggedInUsername, loggedInUserImage, hondleEditFormOpen}) {
  console.log(id, 'shared');
    const classes = useStyles()
    const history = useHistory()
    const dispatch  = useDispatch()
    const editInfo = localStorage.getItem('updated')
    const [formOpen, setFormOpen] = React.useState(open); 
    const [editContent, setEditContent] = useState(content)
    const [postImage, setPostImage] = useState(image)
    const [newImage, setNewImge] = useState(null)
    const [imgData, setImgData] = useState(null);
    console.log(editInfo,'edit info');

// load image
const config = { headers: { 
  'Content-Type':'application/json',
  'Authorization': "Bearer " + localStorage.getItem('access_token')
  }}

  useEffect(()=>{
    dispatch(NotificationCount(config))
  },[])


  const onChangePicture = (e) => {
    if (e.target.files[0]) {
        setNewImge(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


    const handleClose = () => {
        setFormOpen(false);
        localStorage.removeItem('updated')
        hondleEditFormOpen()

    };

    const HandlePostEdit =() =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()  
        
        let formData = new FormData()
        if(editContent){
            formData.append('content', editContent)
        }

        if(newImage){
            formData.append('image', newImage)
        }
        console.log(formData.get('content'));
        console.log(formData.get('image'));

        dispatch(EditPost(id, username, formData, config))

        closeDialog()
  }

 
async function closeDialog (){
  await new Promise((resolve) => setTimeout(() => { 
        setFormOpen(false)
        localStorage.removeItem('updated')
        hondleEditFormOpen()
  
  }, 4000))
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
    <div className='editPost'>
      <Dialog
         className='sharePostForm'
        open={formOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >






        {!parent ? (
        <div className="particular-post">
        {/* Post header part begain */}
        <div className='post-header'>
        
        <div className="post_avatar">
          <Avatar src={postUserImage} className={classes.large}/>
        </div>
      
        <div className="post__headerText">
            <h3> {postUserFullname!=='None None'? postUserFullname : postUsername}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{postUsername} </span> 

            </h3 >
        
        </div>
        </div>
          {/* Post header part end */}
        
        {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
          <textarea
            autoFocus
            className="Textarea"
            placeholder="What's your mind ?"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
            
          </div>
          <label style={{width:'150px'}} className="Label">Add / Change Image</label> &nbsp;
          <input type="file" id="upload" onChange={onChangePicture}/><br/><br/>
          {postImage && (<img  className={classes.img} src={imgData ? imgData :postImage} />  )}
              
        </div>
        </div>
        ):(

        
          <div className="particular-post">
         <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={loggedInUserImage}/>
        </div>
      
        <div className="post__headerText">
            <h3> {loggedInUsername}
                
                <span className="post_username"> shareed </span> 
               {/* {parent.user.username} post */}{postUsername}'s post
            </h3 >
            {/* {timestamp.substr(0,10)} {timestamp.substr(10,6)} */}
        </div>
        </div>
         {/* Post header part ended */}
         {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
          <textarea
            autoFocus
            className="Textarea"
            placeholder="What's your mind ?"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          </div>

          {/* parent post  */}
          <div style={{width:'100%',  height:'auto'}}> 
          <div className="particular-shared-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={postUserImage}/>
        </div>
      
        <div className="post__headerText">
            <h3>{postUserFullname}
            
                <span className="post_username"> @  {postUsername}</span> 

            </h3 >
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p>  {content} </p>
          
          </div>
          {/* {parent.image && <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={parent.image} /> } */} 
          <img style={{width:'70%', height:"250px", marginLeft:'30px'}}  src={image} />
         
        </div>
        
      </div>

      
        </div>
        </div>
        </div>
        )}
        
            
        

        <DialogActions className="buttons">
          <Button onClick={handleClose} color="primary" >
            Cancle
          </Button>
          <Button onClick={HandlePostEdit} color="primary" variant="contained">
            Update
          </Button>
          {editInfo!==null && <SnackBer open={true} success_info={editInfo} />}
        </DialogActions>
       
      </Dialog>
    </div>
  );
}