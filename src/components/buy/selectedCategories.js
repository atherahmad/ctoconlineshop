import React, { useState, useEffect } from 'react';
import SearchBar from '../searchBar/searchbar';
import FilterBar from '../filterBar/filterBar';
import Products from './products';
import GET from '../lib/get';


const SelectedCategories = (props) => {

    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const { targetCategory } = props

    useEffect(() => {
        const getProducts = async () => {
            let response = await GET(`/api/buy/${targetCategory}`)
            if (response.data.status === "success") setProducts(response.data.products)
        }
        getProducts()
    }, [])








    const setTargetProduct = (id) => {

        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    return (
        <div>
            <div className='container'>
                <SearchBar />
                <FilterBar />
                <Products products={products} setTargetProduct={setTargetProduct} />

            </div>
        </div>
    );
}

export default SelectedCategories;