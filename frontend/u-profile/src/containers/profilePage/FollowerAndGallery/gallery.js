import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    gallery:{
        marginTop:50,
        width:'80%',
        margin:'auto',
    },
    timeline:{
        width:'80%',
        marginTop:20,
    },
    Title:{
        fontSize:40,
        borderBottom:'2px solid  #EBECED'
    },
    timeLinePicture:{
        display:'flex',
        flexWrap:'wrap'
    },
    timelineimage:{
        width:200,
        height:200,
        margin:10,
        borderRadius:10,
    }
  }))

function Gallery({useWonPost, userProfile}) {

    const classes = useStyles()

    return (
        <div className={classes.gallery}>

            {/* profile picture */}
            <div>
                <div className={classes.Title}>
                    Profile picture
                </div>
                <div className={classes.timeLinePicture}>
                    <span> {userProfile && <a href={userProfile.profile.image}><img className={classes.timelineimage} src={userProfile.profile.image}/> </a>}</span>
                    
                </div>
           

            </div>

            {/* Timeline picture */}
            <div className={classes.timeline}>
                <div className={classes.Title}>
                    Timeline picture
                </div>
                <div className={classes.timeLinePicture}>
                {useWonPost.length!==0 && useWonPost.map(post=>(
                    
                  <span> {post.image && <a href={post.image}><img className={classes.timelineimage} src={post.image}/> </a>}</span>
                ))
                    
                    
                    }
                </div>
           
            </div>
            
        </div>
    )
}

export default Gallery
