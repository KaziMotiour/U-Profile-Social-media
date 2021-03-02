import React, {useState} from 'react'

import Nav from './Nav'

const Layout = props =>{

   
    return(
    <div>
        <Nav />
        <main >
        {props.children}
        </main>

    </div>
    )};

export default Layout