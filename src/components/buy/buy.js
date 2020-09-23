import React, { useEffect, useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from '../searchBar/searchbar';
import Products from "./products"
import SlideShow from './slideShow';
import GET from '../lib/get';
import axios from "axios"
import FilterBar from "../filterBar/filterBar"
import ProductDetails from './productDetails';
import  {GlobalContextContext} from "../Context/contextApi"
// import { IfNotAuthenticated } from '../lib/auth';



const BuyComponent = (props) => {
    const [profile,setProfile]=useContext(GlobalContextContext)
    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [filteredProducts, setFilteredProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)

    const getFavorities = async()=>{
        if(!localStorage.getItem("c2c-token")) return
        let response= await GET(`${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`)
        if(response.data.status==="success")
        setProfile({ ...profile,favorities:response.data.favourities})
    }
    useEffect(() => {
        const fetchData = async () => {
            let response = await GET(`${process.env.REACT_APP_DB_HOST}/api/buy/allproducts`)
            setProducts(response.data.data)
        }
        fetchData()
        
        getFavorities()
    }, [])

    const favoritHandler = async()=>{
        let response= await GET(`${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`)
        if (response.data.status === "success") setProfile({ ...profile,favorities:response.data.favourities})
    }
    const searchHandler=(text, category)=>{
        setFilteredProducts(false)
        console.log("search handler called", text, "category", category)
        if(!text)
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/buy/categories/${category}`,{params: {
            text: text
          }})
            .then(res => {if(res.data.success) {
                console.log(res.data.products, "in search")
                setProducts(res.data.products)}})
            .catch(err => err)
        else axios.get(`${process.env.REACT_APP_DB_HOST}/api/buy/categoriessearch/${category}`,{params: {
            text: text
          }})
            .then(res => {if(res.data.success) setProducts(res.data.products)})
            .catch(err => err)
    }

    const filterHandler = (e) => {

        e.preventDefault();
        let colorValue = parseInt(e.target.color.value)
        let conditionValue = parseInt(e.target.condition.value)
        let priceValue = parseInt(e.target.price.value)
        setFilteredProducts(products
            .filter(product => {
                if (colorValue !== 0) return product.color === colorValue
                else return true
            })
            .filter(product => {
                if (conditionValue !== 0) return product.condition === conditionValue
                else return true
            })
            .filter(product => {
                if (priceValue !== 0) return product.priceRange === priceValue
                else return true
            }))

    }

    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        getFavorities()
        setShowModal(false)
        setShowMainComponents(true)

    }
    return (
        <div>

            {showMainComponent?<><div className="container">
                <SlideShow />
            </div>


            <div style={{
                visibility: showMainComponent ? "visible" : "hidden",
                opacity: 1,
                transition: "visibility 0s 0.5s, opacity 0.5s linear"
            }}>
                <SearchBar
                    products={filteredProducts ? filteredProducts : products}
                    category={0}
                    searchHandler={searchHandler}
                    {...props}
                />

                <FilterBar
                    filterHandler={filterHandler}
                />

                <Products
                    products={filteredProducts ? filteredProducts : products}
                    setTargetProduct={setTargetProduct}
                    favorit={profile.favorities}
                    favoritHandler={favoritHandler}
                />
            </div></>:null}
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId} {...props}
                />
                : null}
        </div>
    );
}

export default BuyComponent;