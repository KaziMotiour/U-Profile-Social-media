import { Avatar, Button } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import "./TweetBox.css";

function TweetBox() {

  const [tweetMessage, setTweetMessage] = useState('')
  const [tweetImage, setTweetImage]=useState('')

  function sendTweet(e){
    e.preventDefault()

    
  }
  

  return (
    <div className="TweetBox">
      <form>
        <div>
          
          <textarea
            className="textarea"
            placeholder="What's happening ?"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          ></textarea>
        </div>
        <input
          className="tweetBox-imageInput"
          placeholder="Enter image URL"
          type="file"
        
          onChange={(e) => setTweetImage(e.target.value)}
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            className="TweetBox--Button"
            color="primary"
            onClick={sendTweet}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
