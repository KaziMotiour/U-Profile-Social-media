import React, {useEffect} from 'react'
import {makeStyles, Theme, createStyles,} from "@material-ui/core/styles";
import {useDispatch, useSelector} from 'react-redux'
import {NotificationList} from '../../store/actions/Utils'
import Notification from './NotificationList'
import Nav from '../Nav'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      marginTop: "4px",
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    notification:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        margin:'auto',
        ['@media (min-width: 700px)']: { // eslint-disable-line no-useless-computed-key
            maxWidth:'50%'
            
          },
        ['@media (max-width: 990px)']: { // eslint-disable-line no-useless-computed-key
            maxWidth:'80%'
            
          },

          ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            Width:'95%'
            
          },
    },
   
    navli:{
      display:'flex',
      width:'98%',
      height:50,
      '&:hover':{
        backgroundColor:'rgb(214, 210, 210)'
      }
    },
    noNotify:{
        textAlign:'center',
        marginTop:'50px',
      color:'rgb(214, 210, 210)',
      fontSize:'250%',
    }



    })
)


function NotificationForMobile() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.user.notifications)

    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}

    useEffect(() => {
        dispatch(NotificationList(config))
    }, [])

    return (
        <div>
            <Nav />
            <div className={classes.notification}>
            
             {notifications.length!==0 ? (notifications.map(notify=>(
                   <li className={classes.navli}> <Notification notify={notify} key={notify.id}/> </li>))) : <span className={classes.noNotify}>no Notification yeat </span> }
            </div>
        </div>
    )
}

export default NotificationForMobile
