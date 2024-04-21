import React from 'react';
import './Sidebar.css';
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon, Close } from "@material-ui/icons";

function Sidebar({ onClose }) {
    return (
        <div className="sidebar">
            {/* <button onClick={onClose}>Close Sidebar</button> */}
            <IconButton onClick={onClose} style={{position: "relative", left: "100px"}}>
                <Close />
            </IconButton>
            {/* Add your sidebar contents here */}
            <div className='sidebar-options'><a href='/dashboard'>Home</a></div>
            {/* ... */}
        </div>
    );
}

export default Sidebar;
