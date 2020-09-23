import React, {useState,useEffect,useContext} from 'react';
import MyProfile from './profile/mainProfile';
import '../../App.css'
import MainActivity from './activity/activity.js';
import { Tabs, Tab } from 'react-bootstrap'
import Favorites from './favorities/favorities';
import '../styles/main.css'
import GET from '../lib/get';
import ProductDetails from '../buy/productDetails';
import  {GlobalContextContext} from "../Context/contextApi"


export default function MainAcc(props) {
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [url, setUrl]=useState("")
    const [status, setStatus]=useState("")
    const [profile,setProfile]=useContext(GlobalContextContext)

    const mykey = props.location.mykey ? props.location.mykey : "profile"
    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            getFavorities()
        }
    }, [])
    const getFavorities = async()=>{
        if(!localStorage.getItem("c2c-token")) return
        let response= await GET(`${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`)
        if(response.data.status==="success")
        setProfile({ ...profile,favorities:response.data.favourities})
    }
    const setTargetProduct = (id,url,status) => {
        setProductId(id)
        setUrl(url)
        setStatus(status)
        setShowModal(true)
        
    }


    const handleClose = () => {
        setShowModal(false)

    }
    return (
        <div >
            {showModal ?
                <ProductDetails 
                    showModel={showModal} 
                    handleClose={handleClose}
                    id={productId} 
                    {...props}
                    url={url}
                    status={status}
                /> 
                :<div className="container">

                <Tabs
                    defaultActiveKey={mykey}
                    id="uncontrolled-tab-example"
                    mountOnEnter={true}
                    unmountOnExit={true}>


                    <Tab eventKey="profile" title="Profile"  >
                        <MyProfile {...props} />
                    </Tab>
                    <Tab eventKey="activities" title="Activities" >
                        <MainActivity {...props}
                            favorit={profile.favorities}
                            favoritHandler={getFavorities}
                            setTargetProduct={setTargetProduct}
                            handleClose={handleClose} />

                           
                    </Tab>
                    <Tab eventKey="favorities" title="Favorities" >
                        <Favorites {...props}
                            favorit={profile.favorities}
                            favoritHandler={getFavorities}
                            setTargetProduct={setTargetProduct}
                            handleClose={handleClose} />
                    </Tab>


                </Tabs>

            </div>}
        </div>
    );
}
