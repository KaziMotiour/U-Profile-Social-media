import React, {forwardRef, useState, useEffect} from "react";
import { Avatar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';   
import  VerifiedUserIcon  from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShareIcon from '@material-ui/icons/Share';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

// drop down import
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//end drop down import
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {GetPostList, LikePost, CommentPost, ChangePrivacy} from '../../../../store/actions/PostCrud'
import "./Post.css";
import { CommentTwoTone } from "@material-ui/icons";

// dropdown style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    text:{
      width:'70%',
    }
    
  }),
);

const Privacyoptions = [
  'public',
  'friends',
  'onlyme',
];
const postOptions = [
  'Edit',
  'Delete',
];
// end dropdown style



const Post  = forwardRef(({id, user, parent, content, image, privacy, is_retweet, is_saved, likes, postComment, timestamp, is_liked  }, ref) =>{


  // drop down
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
  const [opneEditOption, setOpenEditOption] = useState(false)
  const [opnePrivacyOption, setOpenPrivacyOption] = useState(false)
  const [selectedPostEdiOption, setSelectedPostEditOption] = React.useState('');
  const [selectedPrivacyOption, setSelectedPrivacyOption] = React.useState('');
  const [postComments, setPostComments] = useState('');
  const number_of_comment = postComment.length
  const [commentOpen, setCommentOpen] = useState(false)

  const commentControl = () =>{
    setCommentOpen(!commentOpen)

  }

  const HandleLikePost = () =>{
    checkAuthenticatin()
    const config = { headers: { 
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    dispatch(LikePost(id, config))

  }
  const HandleCommetPost = (e, id) =>{
    // checkAuthenticatin()
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    if(e.code==='Enter'){
      const formData = new FormData()
      formData.append('comment', postComments)
      dispatch(CommentPost(id, formData, config))
      setPostComments('')
    }
    
  }


  // async function showAlert (id, config){
  //   await new Promise((resolve) => setTimeout(() => { 
  //     console.log(selectedPrivacyOption);
  //       if(selectedPrivacyOption){
        
  //       }
      
  //   }, 2000))
  // }

  const HandlePrivacyChange =(id, option) =>{
   
    checkAuthenticatin()
    console.log(id,  option);
   
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    let formData = new FormData()
      formData.append('privacy', option)
      dispatch(ChangePrivacy(id, formData, config))
    
  }
      

  const checkAuthenticatin =()=>{
    const access_token = localStorage.getItem('access_token')
    if(!access_token){
      history.push({
        pathname: '/login',
        state: { detail: 'Authentication failed, Try to login' }
      })
    }
  }

 
  return (
  
    <div className="post" ref={ref}>
      {!parent ? (
        
      <div className="particular-post">
        {/* Post header part begain */}
        <div className='post-header'>
        
        <div className="post_avatar">
          <Avatar src={user.profile.image} className={classes.large}/>
        </div>
      
        <div className="post__headerText">
            <h3> {user.full_name ? user.username : user.full_name}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{user.username} </span> 

            </h3 >
            {timestamp.substr(0,10)} {timestamp.substr(10,6)}
        
        </div>
        <div style={{marginLeft:'auto'}} className="nav">
        <nav role="navigation">
                <ul>
                  <li onClick={()=> setOpenEditOption(!opneEditOption)} ><h2>...</h2>
                <ul class="dropdown">
                  {opneEditOption &&
                    postOptions.map( (option) =>(
                    <li onClick={e => setSelectedPostEditOption(option)}  className="option"><p>{option}</p></li>
                    ))
                  }
                  
                  
                </ul>
                  </li>
                </ul>
        </nav>


         
        </div>
        </div>
          {/* Post header part end */}
        
        {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {content} </p>
            
          </div>
          {image && <img style={{width:'90%', height:"350px", marginLeft:'30px'}}  src={image} /> }
              
        </div>
        {/* Post body part end */}

          {/* Post footer part begain */}
          <div className="post_footer">
          <div className="likes" >
            {is_liked ?<FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{color:'blue', cursor:'pointer'}}/> : <FavoriteIcon onClick={id =>HandleLikePost(id)}  fontSize="samll" style={{ cursor:'pointer'}}/> } &nbsp; {likes}
              </div>
              <div className="comments" style={{display:'flex'}}>
                <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/> &nbsp;{number_of_comment}
              </div>
              {/* privracy begain */}
              <div className="privacy"> 
               <nav role="navigation">
                <ul>
                 <li> 
                   <div onClick={() => setOpenPrivacyOption(!opnePrivacyOption)} style={{display:'flex',marginTop:'-10px'}}> 
                   <PublicIcon fontSize="samll" aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  style={{cursor:'pointer'}}
                    /> &nbsp;<p> {privacy}</p>
                </div>
                <ul class="dropdown">
                  
                  {opnePrivacyOption &&( <div onClick={() =>setOpenPrivacyOption(!opnePrivacyOption)}>
                  {Privacyoptions.map( (option) =>(
                    <li onClick={e => HandlePrivacyChange(id, option)}  className="option"><p>{option}</p></li>
                  ))} </div>)
                    }

                </ul>
                  </li>
                </ul>
        </nav>
                
              </div>
              {/* privracy end */}
              <div className="shared">
                <ShareIcon fontSize="default"/>
                </div>
          </div>
           {/* Post footer part end */}
          
          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
          
            {postComment && postComment.map(comment => (
              <div className='comment'>
                <div className='comment-header'>
                <Avatar src={comment.user && comment.user.profile.image} className={classes.small}/> 
              </div> 
              <div className='comment-body'>
                <div style={{display:'flex'}}>
                <h4>{comment.user.full_name ? comment.user.username: comment.user.full_name}</h4> &nbsp; <p style={{ontSize:'13px', marginLeft:'auto'}}> </p>&nbsp;{comment.create_date.substr(0,3)}
                </div>
                <div>
                {comment.comment}
                </div>
                
              </div>
              </div>
              
            ))}
          

          <div className='comment'>
          </div>
          <div className="comment-input">
          <Avatar  src={ loggedInUser && loggedInUser.profile.image} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField className={classes.text} onKeyDown={e =>HandleCommetPost(e, id)} onChange={e => setPostComments(e.target.value)} value={postComments}  placeholder="What's you'r mind ?"/>
          </div>


        </div>
        
        }
        {/* Comment section end*/}

      </div>

      ):(

      <div className="particular-post">
        {/* share post part */}
        {/* Post header part begain */}
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={user.profile.image}/>
        </div>
      
        <div className="post__headerText">
            <h3>{user.full_name}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> share's </span> 
               {parent.user.username} post
            </h3 >
            {timestamp.substr(0,10)} {timestamp.substr(10,6)}
        </div>
        {/* post edit options begain */}
        <div style={{marginLeft:'auto'}}>
        <nav role="navigation">
                <ul>
                <li onClick={()=> setOpenEditOption(!opneEditOption)} ><h2>...</h2>
                <ul class="dropdown">
                  {opneEditOption &&
                    postOptions.map( (option) =>(
                    <li onClick={e => setSelectedPostEditOption(option)}  className="option">{option}</li>
                    ))
                  }
                  
                  
                </ul>
                  </li>
                </ul>
        </nav>
      </div>
      {/* post edit options ended */}

        </div>
         {/* Post header part ended */}
         {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> 
               {content}</p>
          </div>

          {/* parent post  */}
          <div style={{width:'100%',  height:'auto'}}> 
          <div className="particular-shared-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={parent.user.profile.image}/>
        </div>
      
        <div className="post__headerText">
            <h3>{parent.user.full_name}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{parent.user.username}</span> 

            </h3 >
            {parent.timestamp.substr(0,10)} {parent.timestamp.substr(10,6)}
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p>  {content}</p>
          
          </div>
          {parent.image && <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={parent.image} /> }
          
              
        </div>


      </div>

          </div>
          {/* parent post  end */}
              
       
        </div>
        {/* Post body part ended */}

        {/* Post fotter part begain */}
          <div className="post_footer">
              <div className="likes">
              {is_liked ?<FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{color:'blue', cursor:'pointer'}}/> : <FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{cursor:'pointer'}}/> }&nbsp; {likes}
              </div>
              <div className="comments" style={{display:'flex'}}>
              <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/> &nbsp;{number_of_comment}
              </div>
               {/* Post privacy part begain */}
              <div className="privacy"> 
              <nav role="navigation">
                <ul>
                <li  >
                <div onClick={() => setOpenPrivacyOption(!opnePrivacyOption)} style={{display:'flex',marginTop:'-10px'}}> 
                   <PublicIcon fontSize="samll" aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  style={{cursor:'pointer'}}
                    /> &nbsp;<p> {privacy}</p>
                </div>
                <ul class="dropdown">
                  
                  {opnePrivacyOption &&( <div onClick={() =>setOpenPrivacyOption(!opnePrivacyOption)}>
                  {Privacyoptions.map( (option) =>(
                    <li onClick={e => setSelectedPrivacyOption(option)}  className="option">{option}</li>
                  ))} </div>)
                    }

                </ul>
                </li>
                </ul>
        </nav>
         
      
      </div>
      {/* Post privacy part  */}
              <div className="shared">
                <ShareIcon fontSize="default"/>
              </div>
          </div>
          {/* Post body part ended */}

          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
        {postComment && postComment.map(comment => (
              <div className='comment'>
                <div className='comment-header'>
                <Avatar src={postComment.user && postComment.user.profile.image}  className={classes.small}/> 
              </div> 
              <div className='comment-body'>
              <div style={{display:'flex'}}>
                <h4>{comment.user.full_name }</h4> &nbsp; <p style={{ontSize:'13px', marginLeft:'auto'}}></p>
                </div>
                <div>
                {comment.comment}
                </div>
              </div>
              </div>
              
            ))}
  
          <div className="comment-input">
          <Avatar src={ loggedInUser && loggedInUser.profile.image} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField onKeyDown={e =>HandleCommetPost(e, id)}className={classes.text} onChange={e => setPostComments(e.target.value)} value={postComments}  placeholder="What's you'r mind ?"/>
          </div>
        </div>}
        {/* Comment section end*/}

      </div>)}


    </div>
  );
})

export default Post;
