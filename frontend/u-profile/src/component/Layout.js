import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Nav from './Nav'

const Layout = props =>{

    const accessToken = useSelector(state => state.auth.access_token)
    console.log(accessToken);
    console.log('dddd');
    return(
    <div>
       {/* {accessToken && <Nav />} */}
        <main >
        {props.children}
        </main>

    </div>
    )};

export default Layout