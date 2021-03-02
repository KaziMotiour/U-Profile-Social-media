import React from 'react'
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./widgets/Widgets";
import './Home.css'


function home(props) {
    return (
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
    )
}

export default home
