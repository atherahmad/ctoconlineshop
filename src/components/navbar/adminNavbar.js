import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/main.css'
import { Navbar, Nav, Badge } from 'react-bootstrap';
import pic1 from '../../logo/1.png'




const AdminNavbar = (props) => {
    const adminButtonStyle = {
        background: '#b72826',
        padding: "10px",
        borderRadius: "0px 30px 30px 0px",
        color: "white",
        boxShadow: "2px 4px 15px rgba(0, 0, 0, 0.363)"
    }
    const { profile, logoutHandler } = props
    return (
        <div>
            <Navbar expand="lg">

                <Navbar.Brand className="navLogo">
                    <Link className="text-light text-uppercase" to="/">
                        <img src={pic1} alt="" width="200px" height="70px" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link className="d-flex justify-content-center ">
                            <span className="navB">Welcome <span className="navBRed">{profile.name}</span> to the ADMIN PANNEL </span>
                        </Nav.Link>

                    </Nav>
                    <Nav>

                        <Nav.Link className="btn " onClick={logoutHandler}>
                            <Link className="text-light text-uppercase" to="/signin">
                                <span className="navTitle fa fa-sign-out " style={{ fontSize: "26px", color: "#11213b" }}></span>
                            </Link>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse></Navbar>
        </div>)
}
export default AdminNavbar;