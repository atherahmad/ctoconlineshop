import React, { useState, useEffect, useContext } from 'react';
import '../styles/main.css'
import GET from '../lib/get';
import { GlobalContextContext } from "../Context/contextApi"
import UserNavbar from './userNavebar';
import AdminNavbar from './adminNavbar';




const MyNavbar = (props) => {

    const [profile, setProfile] = useContext(GlobalContextContext)
    const logoutHandler = () => {
        localStorage.removeItem('c2c-token')
        localStorage.removeItem("c2c-profile")
        setProfile({
            ...profile,
            auth: false,
            userId: false,
            favorities: [],
            name: false,
            email: false,
            admin: false
        })

    }


    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            const getData = async () => {
                let response = await GET("/api/auth/authenticated")
                if (response.data) {
                    if (response.data.status === "success") {
                        setProfile({
                            ...profile,
                            auth: true,
                            userId: response.data.data._id,
                            name: response.data.data.firstName,
                            favorities: response.data.data.liked,
                            email: response.data.data.email,
                            admin: response.data.data.admin
                        })
                    }
                }
                else {
                    setProfile({
                        ...profile,
                        auth: false,
                        userId: false,
                        favorities: [],
                        name: false,
                        email: false,
                        admin: false
                    })
                    localStorage.removeItem("c2c-token")
                    localStorage.removeItem("c2c-profile")
                }
            }
            getData()
        }
        else setProfile({
            ...profile,
            auth: false,
            userId: false,
            favorities: [],
            name: false,
            email: false,
            admin: false
        })

    }, [])

    return (
        <div>
            {!profile.admin ? <UserNavbar profile={profile} logoutHandler={logoutHandler} /> : <AdminNavbar profile={profile} logoutHandler={logoutHandler} />}
        </div>

    )
}
export default MyNavbar;
        /*<div>
<Navbar expand="lg">

<Navbar.Brand className="navLogo">
<Link className="text-light text-uppercase" to="/">
<img src={pic1} alt="" width="200px" height="70px" />
</Link>
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
<Nav.Link id="home" >
<Link className="text-light text-uppercase" to="/">
<span className="navTitle">Home</span>
</Link>
</Nav.Link>
<Nav.Link id="sellitems" >
<Link className="text-light text-uppercase" to="/sellitems">
<span className="navTitle">Sell</span>
</Link>
</Nav.Link>

<Nav.Link id="buy" >
<Link className="text-light text-uppercase" to='/buyitems'>
<span className="navTitle">Buy</span>
</Link>
</Nav.Link>
<Nav.Link id="contact" >
<Link className="text-light text-uppercase" to='/contact'>
<span className="navTitle">Contact</span>
</Link>
</Nav.Link>

{profile.admin ?
<Nav.Link id="admin" >
<Link className="text-light text-uppercase" to='/admin'>
    <span className="navTitle"
        style={adminButtonStyle}>
        Admin
        </span>
</Link>
</Nav.Link>
: null
}
</Nav>

{profile.auth ?

<Nav>
<Nav.Link>
<Link className="text-light text-uppercase" to="/messages">
    <span className="navTitle">Messages</span>
</Link>
</Nav.Link>
<Nav.Link>
<Link className="text-light text-uppercase" to="/account">
    <span className="navTitle">Account</span>
</Link>
</Nav.Link>
<Nav.Link className="justify-content-center ">
<span className="navB">Welcome <span className="navBRed">{profile.name}</span> </span>
</Nav.Link>
<Nav.Link className="btn " onClick={logoutHandler}>
<Link className="text-light text-uppercase" to="/signin">
    <span className="navTitle fa fa-sign-out " style={{ fontSize: "26px", color: "#11213b" }}></span>
</Link>
</Nav.Link>
</Nav>
:
<Nav className="justify-content-end">

<Link className="text-light text-uppercase" to="/signin" >
<span className="navTitle fa fa-sign-in " style={{ fontSize: "26px", color: "#11213b" }}></span>
</Link>
</Nav>
}

<Nav>
<Nav.Link>
<Badge className='text-danger'>
<span className="badge badge-danger " style={{ verticalAlign: "super" }}>10</span>
<Link to="/">
    <svg className="bi bi-bell navTitle" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z" />
        <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clip-rule="evenodd" />
    </svg>
</Link>
</Badge>
</Nav.Link>
</Nav>

</Navbar.Collapse></Navbar>
</div>*/
