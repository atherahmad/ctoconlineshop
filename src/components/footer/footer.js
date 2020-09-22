import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/main.css';

import logo from '../../logo/1.png'
const MyFooter = (props) => {
    return (
        <div>
            <div className="footer">
                <div className="footerLogo ">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className=" footerInfo ">
                <Link className="footerLink" to='/sellitems'>Sell</Link>
                <Link className="footerLink" to='/buyitems'>Buy</Link>
                <Link className="footerLink" to='/contact'>Contact</Link>
                <Link className="footerLink" to='/signin'>Signin</Link>
            </div>
            <hr className="container" />
            <div className="footerInfo2 ">
                <h5 className="mt-2"> &copy; {new Date().getFullYear()} Copyright C-2-C Online Shop - Developed by:</h5>
                <a className="footerLink2 ml-2" href='https://github.com/Milad-mosadegh'>Milad Mosadegh</a>
                <a className="footerLink2 ml-2" href='https://github.com/atherahmad'>Ather Ahmad</a>
            </div>
        </div>


    );
}

export default MyFooter;