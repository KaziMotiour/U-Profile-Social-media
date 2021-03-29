import React,{useEffect} from 'react'
import {GetSinglePost} from '../../../../../store/actions/PostCrud'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';   
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Media from '../LoadPost'
import Post from '../Post'
import Nav from '../../../../../component/Nav'


const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    root: {
      width:'100%',
    
    },
    post:{
        display:'flex',
        justifyContent:'center',
        marginTop:40,
        marginBottom:100,
    }
  })
  )
    

function SinglePost() {

    const classes = useStyles()
    const {postId} =useParams()
    const dispatch = useDispatch()
    const singlePost = useSelector(state => state.post.singlePost)
    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}
    useEffect(()=>{
        dispatch(GetSinglePost(postId, config))
    },[])

    const userposts =singlePost!==null?
        <Post 
          key={singlePost.id}
          id={singlePost.id}
          parent={singlePost.parent}
          user={singlePost.user} 
          content ={singlePost.content}
          image={singlePost.image}
          privacy={singlePost.privacy}
          is_retweet={singlePost.is_retweet}
          is_saved={singlePost.is_saved}
          likes={singlePost.likes}
          postComment = {singlePost.postComment}
          timestamp = {singlePost.timestamp}
          is_liked = {singlePost.is_liked}
          shared_user = {singlePost.shared_user}
          />

      :<Media />



    return (
        <div className={classes.root}>
            <Nav />

          
            <div className={classes.post}>
                {userposts}
            </div>
            
            
        </div>
    )
}

export default SinglePost
