import React, { useState, useEffect } from 'react'
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./widgets/Widgets";
import Nav from '../../component/Nav'
import './Home.css'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {GetPostList} from '../../store/actions/PostCrud'
import {LoggedUserInfo} from '../../store/actions/UserProfile'
import {REMOVE_NOTIFICATION_LIST} from '../../store/actions/ActionTypes'
import {VerifyJwtToken} from '../../store/actions/Auth'




function Home(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    const notificationLists = useSelector(state => state.user.notificationList)
    const notifcationCount = notificationLists.length
    useEffect(() =>{
        dispatch(VerifyJwtToken())
        const access = localStorage.getItem('access_token')
        const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}

        access && dispatch(LoggedUserInfo(config))
        checkAuthenticatin()
      },[])

      const checkAuthenticatin =()=>{
        const access_token = localStorage.getItem('access_token')
        if(!access_token){
          history.push({
            pathname: '/login',
            state: { detail: 'session expired, Try to login again' }
          })
        }
      }
    

    const loggedinUser = useSelector(state => state.user.loggedinUserInfo)
    return (
        <div className='flex-row'>
          <div>
                <Nav />
          </div>
        <div className="home">

           {/* sidebar */}
           <div className='slider'>
             <Sidebar />
            </div>    

            {/* feed */}
            <div className='feed'>
            <Feed />
            </div>

            {/* widgets */}
            <div className='widgets'>
            <Widgets />
            </div>

        </div>
        </div>
    )
}

export default Home
