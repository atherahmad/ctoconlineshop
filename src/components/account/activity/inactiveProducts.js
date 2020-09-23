import React,{useEffect, useState} from 'react'
import Zoom from 'react-reveal/Zoom';
import Products from '../../buy/products';
import axios from "axios"

function InactiveProducts(props) {

    const {setTargetProduct, favorit, favoritHandler}=props
    const [inActiveProducts, setInActiveProducts] = useState("")
    useEffect(() => {
        let config;
        if(localStorage.getItem("c2c-token")) config = {headers:{
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('c2c-token')
        }}
            else props.history.push("/signin")
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/account/inactiveproducts`,config)
        .then(res=>setInActiveProducts(res.data.products))
        .catch(err=>err)
    }, [])
    return (
        <Zoom>
                <Products
                    products={inActiveProducts}
                    setTargetProduct={setTargetProduct}
                    url={`${process.env.REACT_APP_DB_HOST}/api/account/inactiveproductdetails`}
                    favorit={favorit}
                    favoritHandler={favoritHandler}
                    status="inactive"
                />
        </Zoom>
    )
}

export default InactiveProducts
