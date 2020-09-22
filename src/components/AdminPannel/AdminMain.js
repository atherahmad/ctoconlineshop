import React, { useState, useEffect } from 'react';
import '../../App.css'
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap'
import '../styles/main.css'

import UserList from './UserList/UserList';
import ProductList from './ProductList/ProductList';
import Complains from './Complaints/Complaints';
import Curries from './Querries/Querries';
import MyAccount from './MyAccount/MyAccount';




export default function AdminMain(props) {

    const headingStyle = {
        margin: "50px 0",
        letterSpacing: "4px",
        fontSize: "50px"
    }

    return (

        <div className="container mt-5">
            {/* <h1 style={headingStyle}>WELCOME TO ADMIN PANNEL</h1> */}

            <Tabs
                defaultActiveKey="userlist"
                id="uncontrolled-tab-example"
                mountOnEnter={true}
                unmountOnExit={true}
            >

                <Tab eventKey="userlist" title="User List"  >
                    <UserList />
                </Tab>

                <Tab eventKey="productlist" title="Product List" >
                    <ProductList />
                </Tab>

                <Tab eventKey="complains" title="Complaints" >
                    <Complains />
                </Tab>

                <Tab eventKey="curries" title="Queries" >
                    <Curries />
                </Tab>

                <Tab eventKey="myaccount" title="My Account" >
                    <MyAccount />
                </Tab>
            </Tabs>



        </div>
    );
}

