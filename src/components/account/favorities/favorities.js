import React, { useEffect, useState } from 'react';
import Products from '../../buy/products';
import axios from "axios"
const Favorites = (props) => {

    const {favorit, favoritHandler,setTargetProduct} = props
    const [products, setProducts] = useState([])




    useEffect(() => {

        axios.get("/api/account/getfavoriteproducts", {
            headers: {
                'x-auth-token': localStorage.getItem("c2c-token")
            }
        })
            .then(res => setProducts(res.data.products))
            .catch(err => err)

    }, [])

    return (
        <div className='shadow'>
            <div className="d-flex">
                <div className="row">
                    <Products
                        products={products}
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </div>
            </div>
        </div>
    )
}


export default Favorites;