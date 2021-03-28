import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { BorderBottom } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        margin:'10px',
        marginTop:'50px',
        border:0,
        borderRadius:'10px',
        paddingBottom:'10px',
        backgroundColor:'rgb(240, 242, 245)',
        maxWidth:'80%',
        margin:'auto'


    },
    root2:{
        margin:'10px',
        marginTop:'10px',
        border:0,
        borderRadius:'10px',
        paddingBottom:'10px',
        backgroundColor:'rgb(240, 242, 245)',
        maxWidth:'80%',
        margin:'auto'


    },
    heading:{
        // textAlign:'center',
        marginLeft:'8%',
        marginRight:'5%',
        marginTop:'5%',
        fontSize:'20px',
        borderBottom:'2px solid rgb(200, 200, 200)',
        maxWidth:'90%',
    },
    infoList:{
        display:'flex',
        marginLeft:'8%',
        marginTop:10,
        margin:20,
    },
    icon:{
        color:'rgb(63, 81, 181)',
    },
    info:{
        fontSize:15,
        marginLeft:3,
    },
    social:{
        marginLeft:'8%',
        marginTop:10,
        margin:10,
        display:'flex',
        height:'auto',
        width:'80%',
        backgroundColor:'rgb(63, 81, 181)',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        cursor:'pointer',
        padding:1,
    },
    socialLink:{
        color:'white',
        
    }


  })
)



function UserInformation({userInfo}) {
    const classes = useStyles()
    
    return (
        <div>
            <div className={classes.root}>
                <div className={classes.heading} > 
                    User info
                </div>

                {/* UserInfo */}
                <div className={classes.infoList}>
                <PermIdentityIcon className={classes.icon}/> 
                    <p className={classes.info}>{userInfo && userInfo.profile.bio}</p>
                </div>

                <div className={classes.infoList}>
                <BusinessCenterIcon className={classes.icon}/> 
                <p className={classes.info}>{userInfo && userInfo.profile.occupations}</p>
                </div>

                <div className={classes.infoList}>
                <EmojiPeopleIcon className={classes.icon}/> 
                <p className={classes.info}>{userInfo && userInfo.profile.gander}</p>
                </div>

                <div className={classes.infoList}>
                <FavoriteIcon className={classes.icon}/>
                <p className={classes.info}>{userInfo && userInfo.profile.relationship_status}</p>
                </div>

                <div className={classes.infoList}>
                <ContactPhoneIcon className={classes.icon}/>
                <p className={classes.info}>{userInfo && userInfo.profile.Phone}</p>
                </div>
                <div className={classes.infoList}>
                <LocationOnIcon className={classes.icon}/>
                <p className={classes.info}>{userInfo && userInfo.profile.location}</p>
                </div>
            </div>

            {/* social links */}
            <div className={classes.root2}>
                <div className={classes.heading} > 
                    Social Links
                </div>
               {userInfo && userInfo.profile.facebook_Link &&  <div className={classes.social}>
                <FacebookIcon /><a className={classes.socialLink} href={userInfo.profile.facebook_Link} target="_blank"> Facebook </a>
                </div>}

                {userInfo && userInfo.profile.github_link && <div className={classes.social}>
                <GitHubIcon /> <a className={classes.socialLink} href={userInfo.profile.github_link} target="_blank"> GitHub </a>
                </div> }

                {userInfo && userInfo.profile.linkdin_link && <div className={classes.social}>
                <LinkedInIcon /><a className={classes.socialLink} href={userInfo.profile.linkdin_link} target="_blank"> LinkedIn </a>
                </div>}
                {userInfo && userInfo.profile.twitter_link &&
                <div className={classes.social}>
                <TwitterIcon />  <a className={classes.socialLink} href={userInfo.profile.twitter_link} target="_blank"> Twitter </a>
                </div>}
            </div>
            

        </div>
    )
}

export default UserInformation
