import React from 'react'
import ProfileInfo from './profileInfo/ProfileInfo'
import ProfilePost from './profilePost/profilePost'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Nav from '../../component/Nav'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:'100%',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            
          },
    },
    profileInfo:{
        width:'100%',
        margin:0,
        padding:0,
       
    },
    profilePost:{
        width:'100%',
        margin:0,
        padding:0,
        marginTop:20,
       
    }
  })
)

function ProfilePage() {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Nav />


            {/* profile info */}
            <div className={classes.profileInfo}>
            <ProfileInfo />
            </div>
            
            {/*  */}
            <div className={classes.profilePost}>
            <ProfilePost />
            </div>
            
        </div>
    )
}

export default ProfilePage
