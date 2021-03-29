import React, {useEffect, useState} from 'react'

import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import {UserProfile, UserFollow, LoggedUserInfo, EditUserProfile} from '../../store/actions/UserProfile'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SnackBer from '../Home/Feed/Post/sharePost/SnackBer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root:{
        display:'flex',
        flexDirection:'column',
       
        
      },

      title:{
        
        textAlign:'center',
        
        fontSize:40,
        marginBottom:10,
        paddingBottom:5,
        borderBottom:'2px solid #EBECED'
    },

      profile:{
        //   backgroundColor:'red',
       
        backgroundColor:'rgb(240, 242, 245)',
        paddingBottom:20,
        marginBottom:20,
      },

      large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        // marginLeft:20,
        margin:'auto',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: '100px',
            height: '100px',
            
          },
      },

      profilePicture:{
          width:'100%',
          margin:'auto',
          position:'relative'
      },

      pTitle:{
        fontSize:30,
        paddingLeft:20,
        color:'rgb(24, 85, 120)',
        ['@media (max-width: 400px)']: {
            marginBottom:20,
        }
      },

      addIcon:{
        width: theme.spacing(4),
        height: theme.spacing(4),
          width:'92%',
          margin:'auto',
          position:'absolute',
          bottom:-10,
          left:0,
          color:'rgb(17, 82, 147)',
          cursor:'pointer'
      },

      buttons:{
        marginTop:10,
        display:'flex',
        justifyContent:'center'
      },

      button:{
        marginLeft:8,
      },

      coverPicture:{

          display:'flex',
          flexDirection:'column',
          marginTop:20,
          marginBottom:100,
          paddingTop:20,
          paddingBottom:100,
          backgroundColor:'rgb(240, 242, 245)',
      },

      coverPictureHeader:{
          display:'flex',
          justifyContent:'space-between',
          marginRight:20,
          ['@media (max-width: 430px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection:'column',
            width:'70%',
            margin:'auto'    
          },
      },

      coverPictureBoddy:{
          display:'flex',
          marginTop:20,
          margin:'auto'
      },

      coverPic:{
          maxWidth:'70%',
          maxHeight:400,
          margin:'auto',
          borderRadius:10,
      },
      CButton:{
        display:'flex', marginTop:20, marginBottom:100, justifyContent:'center'
      },
      CUIcon:{
          display:'flex',
        backgroundColor:'rgb(63, 81, 181)',
        cursor:'pointer',
        color:'white',
        padding:5,
        borderRadius:5,
      }
     
    })
)
function ChangeProfilePicture({userInfo}) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileImgData, setProfileImgData] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [coverImgData, setCoverImgData] = useState(null);
    const ProfileUpdateSuccess = useSelector(state => state.user.userUpdateSuccess)

    console.log('profile', ProfileUpdateSuccess);

    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}

      useEffect(()=>{
        if (ProfileUpdateSuccess === true){
            setCoverImgData(null)
            setCoverPicture(null)
            setProfilePicture(null)
            setProfileImgData(null)
        } 
      },[ProfileUpdateSuccess])


    const onChangeProfilePicture = e => {
       
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setProfileImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

      const ChangeCoverPicture = e => {
        console.log('hello');
        if (e.target.files[0]) {
            setCoverPicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setCoverImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

      const CancleProfilePicUpdate = () =>{
        setProfileImgData(null)
      }
    
    const CancleCoverPicUpdate = () =>{
        setCoverImgData(null)
      }


      const HandleProfilePictureChange = () =>{
        let formData = new FormData()
        {profilePicture!==null && formData.append('image', profilePicture )}
        dispatch(EditUserProfile(userInfo.profile.id, userInfo.username, formData, config))
      }

      const HandleCoverPictureChange = () =>{
        let formData = new FormData()
        {coverPicture!==null && formData.append('cover_picture', coverPicture )}
        dispatch(EditUserProfile(userInfo.profile.id, userInfo.username, formData, config))
      }


    return (
        <div className={classes.root}>
           <div className={classes.title}>
                    Profile And Cover Picture 
            </div> 

            <div className={classes.profile}>
               
                <div className={classes.profilePicture}>
                    <span className={classes.pTitle}>Profile Picture</span>
                   {profileImgData===null ? <Avatar src={userInfo && userInfo.profile.image}  className={classes.large}/> :  <Avatar src={profileImgData}  className={classes.large}/>} 
                    
                      <input type="file" id="upload" hidden onChange={onChangeProfilePicture}/>
                      {profileImgData ===null &&<label  for="upload" ><AddAPhotoIcon  className={classes.addIcon}/>
                    </label>}

                    {profileImgData!==null && <div className={classes.buttons}>
                      <Button className={classes.button} 
                            style={{backgroundColor:'rgb(171, 46, 38)'}} variant="contained" color="secondary"
                            onClick={CancleProfilePicUpdate}
                            >
                                Cancle
                        </Button>
                        <Button className={classes.button} 
                            style={{backgroundColor:'rgb(66, 129, 245)'}} variant="contained" color="primary"
                            onClick={HandleProfilePictureChange}
                            >
                                Upload
                        </Button> 
                    </div>}
                </div>

               
                
            </div>

            <div className={classes.coverPicture}>

                <div className={classes.coverPictureHeader}>
                    <span className={classes.pTitle}>Cover Picture</span>

                    <div className={classes.CUIcon}>
                        <input type="file" id="upload"  style={{width:180}}  onChange={ChangeCoverPicture} />
                        <label style={{cursor:'pointer'}}  for="upload" > <AddAPhotoIcon />
                        </label>
                    </div>

                </div>

                <div className={classes.coverPictureBoddy}>

                {coverImgData === null ? <img src={userInfo && userInfo.profile.cover_picture} className={classes.coverPic} /> : <img src={coverImgData} className={classes.coverPic} />}

                    

                </div>
               {coverImgData !==null &&  <div className={classes.CButton}>

                    <Button className={classes.button}  style={{backgroundColor:'rgb(171, 46, 38)'}} variant="contained" color="secondary" onClick={CancleCoverPicUpdate}>
                        Cancle
                    </Button>

                    <Button className={classes.button} style={{backgroundColor:'rgb(66, 129, 245)'}} variant="contained" color="primary"
                     onClick={HandleCoverPictureChange}
                    >
                    Upload
                    </Button>
                    </div> }
            </div>
            {ProfileUpdateSuccess===true && <SnackBer open={true} success_info="profile_updated"/>}
        </div>
    )
}

export default ChangeProfilePicture
