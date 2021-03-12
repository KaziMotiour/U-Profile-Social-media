import React, { useState } from 'react'
import { Avatar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {VerifyJwtToken} from '../../../../../store/actions/Auth'
import {CommentUpdate, CommentDelete} from '../../../../../store/actions/PostCrud'
import './Comment.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    text:{
        width:'100%',
        
      },
    comment_body_edit:{
        width: '100%',
        height: 'auto',
        padding: '5px',
        marginLeft: '10px',
        marginTop: '20px',
        fontWeight: '400',
        marginTop: '-5px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
    },
    comment_body:{
        width: 'auto',
        height: 'auto',
        padding: '5px',
        marginLeft: '10px',
        marginTop: '20px',
        fontWeight: '400',
        marginTop: '-5px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',

    },
    cancle_edit:{
        marginTop:'35px', 
        color:'blue',
        cursor:'pointer',
        '&:hover': {
            color: "red",
         },

    }
  }),
);

const CommentEditOptions = [
    'Edit',
    'Delete'
]


function Comment(props) {

    const comment = props.comment

    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [openCommentEditOptin, setOpenCommentEditOption] = useState(false)
    const [editCommentOption, setEditCommentOption] = useState('')
    const [postComment, setPostComment] = useState(comment.comment)
    const loggedin_user_info = useSelector(state=> state.user.loggedinUserInfo)


    const HandleCommetPut = (e, id) =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()
        const config = { headers: { 
          'Content-Type':'application/json',
          'Authorization': "Bearer " + localStorage.getItem('access_token')
        }}
        if(e.code==='Enter'){
          const formData = new FormData()
          formData.append('comment', postComment)
          dispatch(CommentUpdate(id, formData, config))
          setEditCommentOption('')
          setOpenCommentEditOption(false)
        }   
      }

    const HandelSetOption = (option) =>{
        dispatch(VerifyJwtToken())
        checkAuthenticatin()
        setEditCommentOption(option)
        const config = { headers: { 
            'Content-Type':'application/json',
            'Authorization': "Bearer " + localStorage.getItem('access_token')
          }}
        if(option ==='Delete'){
            dispatch(CommentDelete(comment.id, config))
            setEditCommentOption('')
            setOpenCommentEditOption(false)
        }
    }

    const HandleCommentEditOpen= () =>{
        console.log('hello');
        setEditCommentOption('')
        setOpenCommentEditOption(false)

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
     <div className='comment' onClick={() => openCommentEditOptin && setOpenCommentEditOption(false)}> 
        <div className= 'comment-header'>
        <Avatar src={comment.user && comment.user.profile.image} className={classes.small}/> 
      </div> 
      <div className={editCommentOption ==='Edit' ? classes.comment_body_edit : classes.comment_body}>
        <div style={{display:'flex'}}>
        <h4>{comment.user.full_name ? comment.user.username: comment.user.full_name}</h4> &nbsp; <p style={{ontSize:'13px', marginLeft:'auto'}}> </p>&nbsp;{comment.create_date}
        </div>
        <div>
         {editCommentOption === 'Edit' ? (<TextField autoFocus className={classes.text} onKeyDown={e =>HandleCommetPut(e, comment.id)} onChange={e => setPostComment(e.target.value)} value={postComment}  placeholder="What's you'r mind ?" spellCheck="true"/>)  : comment.comment }
        </div>
        
      </div>
      <div>
          {editCommentOption === 'Edit' && (<p className={classes.cancle_edit} onClick={()=>HandleCommentEditOpen()}>cancle</p>)}
    </div>
      <div style={{marginLeft:'auto'}}>
      {loggedin_user_info.username === comment.user.username && <nav role="navigation">
        <ul>
          <li onClick={()=> setOpenCommentEditOption(!openCommentEditOptin)} ><h2>...</h2>
        <ul class="dropdown">
          {openCommentEditOptin &&
            CommentEditOptions.map( (option) =>(
            <li onClick={e => HandelSetOption(option)}  className="option"><p>{option}</p></li>
            ))
          }
          
          
        </ul>
          </li>
        </ul>
        </nav>}
      </div>
      </div>
    )
}

export default Comment
