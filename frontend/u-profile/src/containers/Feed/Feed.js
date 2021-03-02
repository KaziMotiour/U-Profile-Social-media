import React, {useState, useEffect} from "react";
import TweetBox from "./TweetBox/TweetBox";
import Post from './Post/Post'
import "./Feed.css";

function Feed() {

  const [posts, setPosts] = useState([
    
  ])
  

 
  const userposts = posts.map(post=>(
    <Post 
      key={post.text}
      displayName={post.displayName}
      username={post.username} 
      varified ={post.varified}
      text={post.text}
      avatar={post.avatar}
      image={post.image}
      />
  ))
  return (
    <div className="feed">
      {/* Header */}
      <div className="feed-header">
        <h2>Home</h2>
      </div>

      {/* tweetbox */}
      <TweetBox />

      {/* posts */}
      <div className="post">
      <Post />
      </div>    
      
    </div>
  );
}

export default Feed;
