import { Avatar } from "@material-ui/core";
import  VerifiedUserIcon  from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublicIcon from '@material-ui/icons/Public';
import RepeatIcon from '@material-ui/icons/Repeat';
import React, {forwardRef} from "react";

import "./Post.css";

const Post  = forwardRef(({ displayName, username, varified, text, image, avatar }, ref) =>{
  return (
    <div className="post" ref={ref}>
      <div className="post_avatar">
        <Avatar src={avatar}/>
      </div>
      <div className="post_body">
          <div className="post_header">
              <div className="post__headerText ">
                  <h3>{displayName} kazi motiou
                       {varified && <VerifiedUserIcon className="post_badge" /> }<span className="post_username">@{username} motiour</span> 

                  </h3 >
                  time
              </div>
              <div className="post__headerDescription">
                  <p>{text}  </p>

              </div>
              
              <img style={{width:'500px', height:"350px"}}  src={image} />
              
          </div>

          <div className="post_footer">
              <ChatBubbleOutlineIcon fontSize="samll"/>
              <RepeatIcon fontSize="samll"/>
              <FavoriteBorderIcon fontSize="samll"/>
              <PublicIcon fontSize="samll"/>
          </div>

      </div>
    </div>
  );
})

export default Post;
