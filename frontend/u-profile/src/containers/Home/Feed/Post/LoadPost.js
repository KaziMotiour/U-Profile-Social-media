import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import {NotificationCount} from '../../../../store/actions/Utils'
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  card: {
    
    minWidth:'100%',
    margin: theme.spacing(2),
    marginTop:'40px',
    marginBottom:'20px'
  },
  media: {
    height: 190,
  },
}));

const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
function Media(props) {
  const dispatch = useDispatch()
  const { loading = false } = props;
  const classes = useStyles();

  useEffect(() => {
    dispatch(NotificationCount(config))
  }, [])
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
         
        }
        
        title={
         
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
         
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" /> }
      />
      
        <Skeleton animation="wave" variant="rect" className={classes.media} />
       

      <CardContent>
        
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
    
          
        
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <div style={{minWidth:'90%', margin:'auto'}}>
      <Media loading />
      <Media />
    </div>
  );
}