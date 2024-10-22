import React,{useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import { Avatar } from "@material-ui/core";
import { makeStyles,createStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useDispatch,  useSelector} from 'react-redux'
import {REMOVE_MUTUAL_FRIEND} from '../../../../../store/actions/ActionTypes'
import {NotificationCount} from '../../../../../store/actions/Utils'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme: Theme)=>
createStyles({
    title:{
        borderBottom:'1px solid rgb(64, 81, 181)',
        display:'flex'
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        
      },
    body:{
        padding:'20px 50px 5px 50px',  
        display:'flex'
    },
    userList:{
      marginRight:'100px',
      display:'flex'
    },
    button:{
        marginLeft:'auto'
    },
    DeleteIcon:{
        width: theme.spacing(6),
        height: theme.spacing(6),
        color:'rgb(161, 166, 162)',
        cursor:'pointer', 
        marginLeft:'auto'
    }


}))
export default function UserList({id, opene, UserList, closeUserList, typeOfUser, from}) {
  console.log(id,'post id');
  const [open, setOpen] = React.useState(opene);
  const classes = useStyles()
  const dispatch = useDispatch()

  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
  }}

  useEffect(()=>{
    dispatch(NotificationCount(config))
  },[])


  const handleClose = () => {
    setOpen(false);
    closeUserList()
  };
  
  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      > 
        <div className={classes.title}>
          <DialogTitle  id="alert-dialog-slide-title">{typeOfUser}</DialogTitle>
        
        <CancelIcon  onClick={handleClose} className={classes.DeleteIcon} />
        </div>
          {UserList.map(user=>(
              <div  className={classes.body}>
                <div className={classes.userList}>
                <Avatar src={user.profile.image} className={classes.large}/>&nbsp;&nbsp;
                {user.full_name !=='None None' ? user.full_name: user.username}
                </div>
                
                <Button color="primary" className={classes.button}>
                 {from!=='mutualFriend'? <span>{user.is_following ? 'Following' : 'Unknown'}</span>: <sapn>following</sapn>}
                </Button>
              </div>

          ))}
        
      </Dialog>
    </div>
  );
}