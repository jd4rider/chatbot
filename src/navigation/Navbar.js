import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

//Import Authentication
import { useAuthUser } from 'react-auth-kit'
import { useSignOut } from 'react-auth-kit'

import {Link} from 'react-router-dom';

const linkstyle = {
    'color': 'inherit',  
    'text-decoration': 'inherit'
}

const Topnav = () => {
    const auth = useAuthUser()

    const signOut = useSignOut()

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">JDBot</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link><Link to='/' style={linkstyle}>Home</Link></Nav.Link>
            <Nav.Link><Link to='/Features' style={linkstyle}>Features</Link></Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown menuAlign="right" title={`Hello ${auth().username}`} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => signOut()}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
        </>
    );
}

export default Topnav