import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/Notifications';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SidebarOptions from './SidebarOptions'
import { Button } from '@material-ui/core';
import './Sidebar.css'


function Sidebar() {
    return (
        <div className="sidebar">
             {/* twitter icon */} 

            {/* sidebarOptions */}
            <SidebarOptions active Icon={HomeIcon} text="Home"/>
            <SidebarOptions Icon={SearchIcon} text="Explore"/>
            <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications"/>
            <SidebarOptions Icon={MailOutlineIcon} text="Mail"/>
            <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmark"/>
            <SidebarOptions Icon={ListAltIcon} text="List"/>
            <SidebarOptions Icon={PermIdentityIcon} text="Profile"/>
            <SidebarOptions Icon={MoreHorizIcon} text="more"/>

            
            {/* button */}
            <Button variant="outlined"  className="sidebar--tweet" fullWidth>Tweet</Button>
            
        </div>
    )
}

export default Sidebar;
