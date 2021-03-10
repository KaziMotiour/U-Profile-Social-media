import { Avatar, Button } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {CreatePost} from '../../../../store/actions/PostCrud'
import {useDispatch} from 'react-redux'
import "./TweetBox.css";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }),
);

function TweetBox() {

  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const [postContent, setPostContent] = useState('')
  const [tweetImage, setTweetImage]=useState('')
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = e => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  function sendTweet(e){
    e.preventDefault()

    
  }
  const HandleCancleImage = () =>{
    setImgData(null)
    setPicture(null)
  }

  const HandelCreaatePost = (e) =>{
    e.preventDefault()
    
    // checkAuthenticatin()
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    let formData = new FormData();
    formData.append("content", postContent);
    if(picture){
      formData.append("image", picture);
    }
    dispatch(CreatePost(formData, config))

    setPicture(null)
    setImgData(null)
    setPostContent('')
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
    <div className="TweetBox">
      <form>
        <div>
          
          <textarea
            className="textarea"
            placeholder="What's happening ?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>

        <input type="file" id="upload" hidden onChange={onChangePicture}/>
        <label for="upload"  className="Label">Choose file</label>
        {/* Cross icont on image */}
        <div style={{marginLeft:'auto', marginRight:'70px', marginTop:'30px', zIndex:'1'}}>{picture && <CancelIcon style={{color:'rgb(161, 166, 162)', cursor:'pointer',}} onClick={HandleCancleImage} className={classes.large} />}</div>
        {/* Show load  image */}
        {picture && <img src={imgData}  style={{width:'80%', maxHeight:'400px', margin:'auto', borderRadius:'5%', marginTop:'-60px'}}/>}
        
        <div>
          <Button
            type="submit"
            variant="contained"
            className="TweetBox--Button"
            color="primary"
            onClick={HandelCreaatePost}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
