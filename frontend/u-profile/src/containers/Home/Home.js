import React, { useState, useEffect } from 'react'
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./widgets/Widgets";
import Nav from '../../component/Nav'
import './Home.css'
import {useDispatch, useSelector} from 'react-redux'
import {GetPostList} from '../../store/actions/PostCrud'


function Home(props) {
    const dispatch = useDispatch()


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
