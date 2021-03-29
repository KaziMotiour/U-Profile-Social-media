import React,{useEffect, useState} from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, withRouter, NavLink } from "react-router-dom";
import {auth_logout} from '../store/actions/Auth'
import {NotificationCount, NotificationList} from '../store/actions/Utils'
import Notification from './notification/NotificationList'
import {REMOVE_MUTUAL_FRIEND, REMOVE_NOTIFICATION_LIST} from '../store/actions/ActionTypes'
import zIndex from '@material-ui/core/styles/zIndex';
import './nav.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      paddingRight:'10px'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      marginRight:'50px',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    small: {
      marginTop:'4px',
      width: theme.spacing(5),
      height: theme.spacing(5),
      cursor:'pointer',
    },
    nav:{
      width:'400px',
      maxHeight:'300px',
      zIndex:100, 
      marginLeft:'35px',
      marginTop:'10px',
      backgroundColor:'white',
      
    
      
    },
    navs:{
      width:'400px',
      zIndex:100,
      marginLeft:'35px',
      marginTop:'10px',
      height:'300px',
      maxHeight:'400px',
      backgroundColor:'white',
      padding:'2px',
      overflowY:'scroll',
      overflowX:'hidden',
      borderRadius:'10px',
    },
    navli:{
      display:'flex',
      width:'98%',
      '&:hover':{
        backgroundColor:'rgb(214, 210, 210)'
      }
    },
    noNotify:{
      marginTop:'500px',
      color:'rgb(214, 210, 210)',
    }

  
  }),
);

function Nav() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch  = useDispatch()
  const accessToken = useSelector(state => state.auth.access_token)
  const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
  const notificationCount = useSelector(state => state.user.notificationCount)
  const notifications = useSelector(state => state.user.notifications)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openNotificationBar, setOpenNotificationBar] = useState(false)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
  }}

  useEffect(()=>{
    dispatch(NotificationCount(config))
  },[])

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const HandleLogout = ()=>{
    
    dispatch(auth_logout())
    goToLogin()
  }

  const GetNotifcationCount = () =>{

    setOpenNotificationBar(!openNotificationBar)
    dispatch(NotificationList(config))
    console.log('hello');
  
}

const CloseNotificationBar = () =>{
  setOpenNotificationBar(false)
}



  async function goToLogin (){
    await new Promise((resolve) => setTimeout(() => { 
        const access_token = localStorage.getItem('access_token') 
        if(!access_token){
            history.push('/login')
        }
      
    }, 1000))
  }

  const menuId = 'primary-search-account-menu';
  const  renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    
    ><div style={{display:'flex', flexDirection:'column'}}>
      <Link component={NavLink} underline="none"  to={`/${loggedInUser && loggedInUser.username }`}>
      <MenuItem onClick={handleMenuClose} >  Profile </MenuItem>
     </Link>
     
     
     <Link component={NavLink}underline="none"  to={`/accountSetings`}>
      <MenuItem onClick={handleMenuClose}>
        My account
        </MenuItem>
        </Link>
      <MenuItem onClick={handleMenuClose}><p onClick={HandleLogout}>LogOut</p></MenuItem>
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <div >
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div style={{display:'flex', flexDirection:'column'}}>
      <Link component={NavLink} underline="none"  to={`/notification`}>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <p>Notifications</p>
      </MenuItem>
      </Link>

      <Link component={NavLink} underline="none"  to={`/${loggedInUser && loggedInUser.username }`}>
      <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          </IconButton>
        <p>Profile</p>
      </MenuItem>
        </Link>

        <Link component={NavLink} underline="none"  to={`/accountSetings`}>
            <MenuItem >
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge color="secondary">
                  <MeetingRoomIcon />
                </Badge>
              </IconButton>
         
                 My account
        
             </MenuItem>
          </Link>
          
      <MenuItem onClick={HandleLogout}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <MeetingRoomIcon />
          </Badge>
        </IconButton>
        <p onClick={HandleLogout}>Logout</p>
      </MenuItem>
      </div>
    </Menu>
    </div>
  );

  return (
    <div className={classes.grow} onClick={openNotificationBar === true && CloseNotificationBar}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
           <Link component={NavLink}
            underline="none"  to='/' style={{color:'white'}}> uProfile </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
           
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={GetNotifcationCount} >
              <Badge badgeContent={notificationCount} color="secondary">    
                
             {openNotificationBar &&
              <nav role="navigation">
                <ul className={classes.nav}>
                 <li> 
                   
                 <ul class="dropdown" className={ classes.navs}>
                 {notifications.length!==0 ? (notifications.map(notify=>(
                   <li className={classes.navli}> <Notification notify={notify} key={notify.id}/> </li>))) : <span className={classes.noNotify}>no Notification yeat </span> }
                 
                  

                </ul>
                  </li>
                </ul>
                </nav>}


                 <NotificationsIcon />
              </Badge>
            </IconButton>
                  
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              {loggedInUser ? ( <Avatar alt="Remy Sharp" src={loggedInUser.profile.image} className={classes.small} />) :  ( <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />)}
            </IconButton>
          </div>
                
          <div className={classes.sectionMobile}>
          <Link component={NavLink} underline="none"  to={`/${loggedInUser && loggedInUser.username }`}>
            {loggedInUser ? ( <Avatar alt="Remy Sharp" src={loggedInUser.profile.image} className={classes.small} />) :  ( <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />)}
            </Link>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}


    </div>
  );
}
export default withRouter(Nav);