import React, {forwardRef, useState, useEffect} from "react";
import { Avatar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';   
import  VerifiedUserIcon  from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
import {GetPostList} from '../../../../store/actions/PostCrud'
import "./Post.css";

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

const options = [
  'public',
  'friends',
  'only me',
];
const postOptions = [
  'Edit',
  'Delete',
];
// end dropdown style



const Post  = forwardRef(({ user, parent, content, image, privacy, is_retweet, is_saved, likes, postComment, timestamp, is_liked  }, ref) =>{


  // drop down
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPost, setAnchorElPost] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedPostEditIndex, setSelectedPostEditIndex] = React.useState(1);

 


  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPost(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handlePostEditItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    // console.log(index);
    setSelectedPostEditIndex(index);
    setAnchorElPost(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePostItems = () => {
    setAnchorElPost(null);
  };
  // end dropdown
  const [commentOpen, setCommentOpen] = useState(false)

  const commentControl = () =>{
    
    setCommentOpen(!commentOpen)
    console.log(commentOpen);
  }
 
  return (
  
    <div className="post" ref={ref}>
      {!parent ? (
        
      <div className="particular-post">
        {/* Post header part begain */}
        <div className='post-header'>
        
        <div className="post_avatar">
          <Avatar src={'http://127.0.0.1:8000'+user.profilePic} className={classes.large}/>
        </div>
      
        <div className="post__headerText">
            <h3> {user.full_name}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{user.username} </span> 

            </h3 >
            {timestamp.substr(0,10)} {timestamp.substr(10,6)}
        
        </div>
        <div style={{marginLeft:'auto'}}>
         <h2 aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handlePostClickListItem}  style={{cursor:'pointer'}}> ... </h2>
          
          {/* {options[selectedIndex]} */}
      <Menu
        id="lock-menu"
        anchorEl={anchorElPost}
        keepMounted
        open={Boolean(anchorElPost)}
        onClose={handleClosePostItems}
      >
        {postOptions.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedPostEditIndex}
            onClick={(event) => handlePostEditItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
        </div>
        </div>
          {/* Post header part end */}
        
        {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {content} </p>
            
          </div>
          {image && <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={image} /> }
              
        </div>
        {/* Post body part end */}

          {/* Post footer part begain */}
          <div className="post_footer">
          <div className="likes">
            {is_liked ?<FavoriteIcon fontSize="samll" style={{color:'blue'}}/> : <FavoriteIcon fontSize="samll"/> } &nbsp; {likes}
              </div>
              <div className="comments">
                <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/>
              </div>
              {/* privracy begain */}
              <div className="privacy"> 
              <PublicIcon fontSize="samll" aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}  style={{cursor:'pointer'}}
          />

          {privacy}
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
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
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src='' className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>

          <div className='comment'>
          <div className='comment-header'>
            <Avatar src='' className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
          <div className="comment-input">
          <Avatar src={'http://127.0.0.1:8000'+user.profilePic} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField className={classes.text}  placeholder="What's you'r mind ?"/>
          </div>


        </div>
        
        }
        {/* Comment section end*/}

      </div>
      ):(
      <div className="particular-post">
        {/* Post header part begain */}
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={'http://127.0.0.1:8000'+user.profilePic}/>
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
         <h2 aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handlePostClickListItem}  style={{cursor:'pointer'}}> ... </h2>
          
          {/* {options[selectedIndex]} */}
      <Menu
        id="lock-menu"
        anchorEl={anchorElPost}
        keepMounted
        open={Boolean(anchorElPost)}
        onClose={handleClosePostItems}
      >
        {postOptions.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedPostEditIndex}
            onClick={(event) => handlePostEditItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
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
          <Avatar src={'http://127.0.0.1:8000'+parent.user.profilePic}/>
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
              {is_liked ?<FavoriteIcon fontSize="samll" style={{color:'blue'}}/> : <FavoriteIcon fontSize="samll"/> }&nbsp; {likes}
              </div>
              <div className="comments">
              <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/>
              </div>
               {/* Post privacy part begain */}
              <div className="privacy">
               
                <PublicIcon fontSize="samll" aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}  style={{cursor:'pointer'}}
          
          />
          {privacy}
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
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
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src='' className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src='' className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
        </div>}
        {/* Comment section end*/}

      </div>)}


    </div>
  );
})

export default Post;
