import React, { useEffect, useState } from 'react'
import Zoom from 'react-reveal/Zoom';
import Products from '../../buy/products';
import axios from "axios"


function ActiveProducts(props) {

    const { favorit, favoritHandler, setTargetProduct } = props
    const [activeProducts, setActiveProducts] = useState("")
    useEffect(() => {
        let config;
        if (localStorage.getItem("c2c-token")) config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('c2c-token')
            }
        }
        else props.history.push("/signin")

        axios.get("/api/account/myproducts", config)
            .then(res => setActiveProducts(res.data.products))
            .catch(err => err)
    }, [])

    return (
        <div className="d-flex">
            <div className="row">
                <Zoom>
                    <Products
                        products={activeProducts}
                        setTargetProduct={setTargetProduct}
                        url={"/api/buy/activeproductdetails"}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />

                </Zoom>
            </div>
        </div>

    )
}

export default ActiveProducts
