import React,{useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {VerifyJwtToken} from '../../../../../store/actions/Auth'
import {DeletePosts} from '../../../../../store/actions/PostCrud'
import {NotificationCount} from '../../../../../store/actions/Utils'
import SnackBer from '../sharePost/SnackBer'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        title:{
            borderBottom:'2px solid rgb(64, 81, 181)',
            textAlign:'center'

        },
        deletePost:{
            padding:'50px'
        },
        buttons:{
            margin:'auto'
        }
   
  }))

export default function DeletePost({open, username, id, hondleDeleteFormOpen}) {
    console.log('hello from delete form');
    const classes = useStyles()
    const history = useHistory()
    const dispatch  = useDispatch()
    const deleteInfo = localStorage.getItem('deleted')
    const [formOpen, setFormOpen] = React.useState(open); 
    const [newImage, setNewImge] = useState(null)
    const [imgData, setImgData] = useState(null);

    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}

    useEffect(()=>{
      dispatch(NotificationCount(config))
    },[])

    const handleClose = () => {

        setFormOpen(false);
        localStorage.removeItem('deleted')
        hondleDeleteFormOpen()

    };

    const HandlePostDelete =() =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()  
        dispatch(DeletePosts(id, username, config))
        closeDialogg()
  }

 
  async function closeDialogg (){
    await new Promise((resolve) => setTimeout(() => { 
          setFormOpen(false)
          localStorage.removeItem('deleted')
          hondleDeleteFormOpen()
    
    }, 4000))
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

 



  return (
    <div className='editPost'>
        <Dialog
            className='sharePostForm'
            open={formOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >

        <div className={classes.deletePost}>
            <h3 className={classes.title}>Delete Post</h3><br/>
            <p>You Realy want to delete this post</p>

        </div>




      
        

        <DialogActions className={classes.buttons}>
          <Button onClick={handleClose} color="primary" >
            Cancle
          </Button>
          <Button onClick={HandlePostDelete} color="primary" variant="contained">
            Delete
          </Button>
          {deleteInfo!==null && <SnackBer open={true} success_info={deleteInfo} />}
        </DialogActions>
       
      </Dialog>
    </div>
  );
}