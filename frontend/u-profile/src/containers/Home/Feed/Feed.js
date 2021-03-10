import React, {useState, useEffect} from "react";
import TweetBox from "./TweetBox/TweetBox";
import Post from './Post/Post'
import "./Feed.css";
import {useDispatch, useSelector} from 'react-redux'
import {GetPostList} from '../../../store/actions/PostCrud'

function Feed() {

  const dispatch = useDispatch()

  const [posts, setPosts] = useState([
    
  ])

  useEffect(()=>{
    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    dispatch(GetPostList(config))

},[])
const allPost = useSelector(state => state.post.allPost)
  

 
  const userposts = allPost.map(post=>(
    <Post 
      key={post.id}
      parent={post.parent}
      user={post.user} 
      content ={post.content}
      image={post.image}
      privacy={post.privacy}
      is_retweet={post.is_retweet}
      is_saved={post.is_saved}
      likes={post.likes}
      postComment = {post.postComment}
      timestamp = {post.timestamp}
      is_liked = {post.is_liked}
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
      {userposts}
      </div>    
      
    </div>
  );
}

export default Feed;
