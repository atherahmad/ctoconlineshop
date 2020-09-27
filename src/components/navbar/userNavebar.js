import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";
import { Navbar, Nav, Badge } from "react-bootstrap";
import GET from "../lib/get";
import pic1 from "../../logo/1.png";
import { GlobalContextContext } from "../Context/contextApi";

const UserNavbar = (props) => {
  const { profile, logoutHandler } = props;
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
            <Nav.Link id="home">
              <Link className="text-light text-uppercase" to="/">
                <span className="navTitle">Home</span>
              </Link>
            </Nav.Link>
            <Nav.Link id="sellitems">
              <Link className="text-light text-uppercase" to="/sellitems">
                <span className="navTitle">Sell</span>
              </Link>
            </Nav.Link>

            <Nav.Link id="buy">
              <Link className="text-light text-uppercase" to="/buyitems">
                <span className="navTitle">Buy</span>
              </Link>
            </Nav.Link>
            <Nav.Link id="contact">
              <Link className="text-light text-uppercase" to="/contact">
                <span className="navTitle">Contact</span>
              </Link>
            </Nav.Link>
          </Nav>

          {profile.auth ? (
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
                <span className="navB">
                  Welcome <span className="navBRed">{profile.name}</span>{" "}
                </span>
              </Nav.Link>
              <Nav.Link className="btn " onClick={logoutHandler}>
                <Link className="text-light text-uppercase" to="/signin">
                  <span
                    className="navTitle fa fa-sign-out "
                    style={{ fontSize: "26px", color: "#11213b" }}
                  ></span>
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="justify-content-end">
              <Link className="text-light text-uppercase" to="/signin">
                <span
                  className="navTitle fa fa-sign-in "
                  style={{ fontSize: "26px", color: "#11213b" }}
                ></span>
              </Link>
            </Nav>
          )}

          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default UserNavbar;
