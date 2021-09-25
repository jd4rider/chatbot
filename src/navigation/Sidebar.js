import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, 
         FaHeart, 
         FaCaretRight, 
         FaCaretLeft, 
         FaBars,
         FaExclamation
} from 'react-icons/fa';
import { BsFillHouseDoorFill, 
         BsFillPersonFill,
         BsExclamation
} from 'react-icons/bs'
import Button from 'react-bootstrap/Button'; 
import {Link} from 'react-router-dom';

const linkstyle = {
    'color': 'inherit',  
    'text-decoration': 'inherit'
}


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };    
    
    return (
        <div>  
        <ProSidebar collapsed={collapsed} onDoubleClick={handleCollapsedChange} style={{backgroundColor: '#343A40'}} >
            <Menu iconShape="square">
                {collapsed && <MenuItem icon={<FaBars />} onClick={handleCollapsedChange}></MenuItem>}
                {!collapsed && <MenuItem icon={<FaCaretLeft />} onClick={handleCollapsedChange}>Collapse Side Menu</MenuItem>}
                <MenuItem icon={<BsFillHouseDoorFill />}><Link to='/' style={linkstyle}>Home</Link></MenuItem>
                <MenuItem icon={<FaExclamation/>}><Link to='/Triggers' style={linkstyle}>Triggers</Link></MenuItem>
                <SubMenu title="Components" icon={<FaHeart />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
        {/* <Button onClick={handleCollapsedChange}>Click Me</Button> */}
        <footer>
            Bye see ya
        </footer>
        </div>
    )
};

export default Sidebar;

