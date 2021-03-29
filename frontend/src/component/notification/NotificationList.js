import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      marginTop: "4px",
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    notification: {
      display: "flex",
      width: "100%",
      maxHeight:"360px"
    },
    unseenNotification:{
        backgroundColor:'pink'
    },
    name: {
      fontFamily: "Sans-serif",
      fontSize: "14px",
      marginTop: "5px",
      fontWeight: "500px",
      marginLeft: "5px",
    },
    detail: {
      fontFamily: "Sans-serif",
      fontSize: "12px",
      marginTop: "8px",
      fontWeight: "500",
      marginLeft: "5px",
    },
    image: {
      width: "40px",
      height: "40px",
      borderRadius: "5px",
      marginLeft:'auto'
    },
    notify:{
        width:'100%'
    },
    postContent:{
        fontFamily: "Sans-serif",
        fontSize: "12px",
        fontWeight: "500",
        marginLeft:'10px',
    },
    date:{
        marginLeft:'5px',
        fontSize:'11px',
        marginTop:'5px'
    }
  })
);

function Notification({ notify }) {

  const classes = useStyles();
  const history =  useHistory()
  let notification = null;

  const handleShowUserPorfile = (username) =>{
    checkAuthenticatin()
    history.push(`/${username}`)

   
  }

  const handleShowPost = (postId) =>{
    checkAuthenticatin()
    history.push(`/post/${postId}`)

   
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

  if (notify.Notification_type === 1) {
    notification = (
      <div className={notify.is_seen? classes.notification : classes.unseenNotification } onClick={() =>handleShowPost(notify.post.id)}>
        <Avatar
          alt="Remy Sharp"
          src={notify.sender.profile.image}
          className={classes.small}
        />

        <div style={{ display: "flex", width: "320px", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <p className={classes.name}>
              {notify.sender.full_name !== "None None"
                ? notify.sender.full_name
                : notify.sender.username}{" "}
            </p>
            <p className={classes.detail}>Likes your post </p>
            <p className={classes.date}>{notify.date}</p>  
          </div>
            <span className={classes.postContent} style={{marginRight:"auto"}}>
                {notify.post.content && notify.post.content.substr(0, 20)}
            </span>
        </div>
        <div className={classes.image}>
          {notify.post.image && <img src={notify.post.image} className={classes.image} />}
        </div>
      </div>
    );
  }else if(notify.Notification_type === 2){
      notification = (
        <div className={classes.notification} onClick={() =>handleShowPost(notify.post.id)} >
        <Avatar
          alt="Remy Sharp"
          src={notify.sender.profile.image}
          className={classes.small}
        />

        <div style={{ display: "flex", width: "320px", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <p className={classes.name}>
              {notify.sender.full_name !== "None None"
                ? notify.sender.full_name
                : notify.sender.username}{" "}
            </p>
            <p className={classes.detail}>Comment your post </p>
            <p className={classes.date}>{notify.date}</p>
          </div>
            <span className={classes.postContent} style={{marginRight:"auto"}}>
                {notify.text_preview && notify.text_preview.substr(0, 20)}
            </span>
        </div>
        <div className={classes.image}>
          {notify.post.image && <img src={notify.post.image} className={classes.image} />}
        </div>
      </div>
      )

  }else if(notify.Notification_type === 3){
    notification = (
      <div className={classes.notification} onClick={() =>handleShowUserPorfile(notify.sender.username)}>
      <Avatar
        alt="Remy Sharp"
        src={notify.sender.profile.image}
        className={classes.small}
      />

      <div style={{ display: "flex", width: "320px", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <p className={classes.name}>
            {notify.sender.full_name !== "None None"
              ? notify.sender.full_name
              : notify.sender.username}{" "}
          </p>
          <p className={classes.detail}>Started following you </p>
          <p className={classes.date}>{notify.date}</p>
        </div>
          <span className={classes.postContent} style={{marginRight:"auto"}}>
              {notify.text_preview && notify.text_preview.substr(0, 20)}
          </span>
      </div>
      
    </div>
    )

}  


  return <div className={classes.notify}>{notification}</div>;
}

export default Notification;
