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
import React, {forwardRef, useState} from "react";
// drop down import
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//end drop down import

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
// end dropdown style



const Post  = forwardRef(({ displayName, username, varified, text, image, avatar }, ref) =>{


  // drop down
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // end dropdown
  const [commentOpen, setCommentOpen] = useState(false)

  const commentControl = () =>{
    
    setCommentOpen(!commentOpen)
    console.log(commentOpen);
  }

  return (
  
    <div className="post" ref={ref}>

      <div className="particular-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={avatar} className={classes.large}/>
        </div>
      
        <div className="post__headerText">
            <h3>{displayName} kazi motiour
                {varified && <VerifiedUserIcon className="post_badge" /> }<span className="post_username">@{username} motiour</span> 

            </h3 >
              time
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {text} bla bla lorem is a bad boay  bla bla lorem is a bad boay  bla bla lorem is a bad boay bla bla lorem is a bad boay</p>
          
          </div>
          <img style={{width:'90%', height:"350px", marginLeft:'20px'}}  src={image} />
              
        </div>

          <div className="post_footer">
          <div className="likes">
                <FavoriteIcon fontSize="samll"/>
              </div>
              <div className="comments">
                <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/>
              </div>
              <div className="pivracy">
              <PublicIcon fontSize="samll" aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}  style={{cursor:'pointer'}}
          
          />
          {options[selectedIndex]}
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
              <div className="shared">
                <ShareIcon fontSize="default"/>
                </div>
          </div>
          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src={avatar} className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>

          <div className='comment'>
          <div className='comment-header'>
            <Avatar src={avatar} className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
          <div className="comment-input">
          <Avatar src={avatar} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField className={classes.text}  placeholder="What's you'r mind ?"/>
          </div>


        </div>
        
        }
        {/* Comment section end*/}

      </div>




     {/* shared picter */}
      <div className="particular-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={avatar}/>
        </div>
      
        <div className="post__headerText">
            <h3>{displayName} kazi motiour
                {varified && <VerifiedUserIcon className="post_badge" /> }<span className="post_username">  Shared </span> 
               Shafin's post
            </h3 >
              time
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {text} bla bla lorem is a bad boay  bla bla lorem is a bad boay  bla bla lorem is a bad boay bla bla lorem is a bad boay</p>
          </div>

          {/* parent post  */}
          <div style={{width:'100%',  height:'480px'}}> 
          <div className="particular-shared-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={avatar}/>
        </div>
      
        <div className="post__headerText">
            <h3>{displayName} kazi motiour
                {varified && <VerifiedUserIcon className="post_badge" /> }<span className="post_username">@{username}</span> 

            </h3 >
              time
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {text} bla bla lorem is a bad boay  bla bla lorem is a bad boay  bla bla lorem is a bad boay bla bla lorem is a bad boay</p>
          
          </div>
          <img style={{width:'80%', height:"350px", marginLeft:'30px'}}  src={image} />
              
        </div>


      </div>

          </div>
          {/* parent post  end */}
              
       
        </div>

          <div className="post_footer">
              <div className="likes">
                <FavoriteIcon fontSize="samll"/>
              </div>
              <div className="comments">
              <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/>
              </div>
              <div className="pivracy">
               
                <PublicIcon fontSize="samll" aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}  style={{cursor:'pointer'}}
          
          />
          {options[selectedIndex]}
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
              <div className="shared">
                <ShareIcon fontSize="default"/>
              </div>
          </div>
          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src={avatar} className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
          <div className='comment'>
          <div className='comment-header'>
            <Avatar src={avatar} className={classes.small}/> 
          </div> 
          <div className='comment-body'>
            <h4>kazi motiour</h4>
            heelo dearsdf asdf asdf asdf  
          </div>
          </div>
        </div>}
        {/* Comment section end*/}

      </div>
    </div>
  );
})

export default Post;
