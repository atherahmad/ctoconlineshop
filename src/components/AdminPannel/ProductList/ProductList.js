import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import ProductListModal from './productListModal';
import Art from '../../../images/art.jpg'
import AdminSearch from '../Search/adminSearch';


function ProductList(props) {

    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [creator, setCreator] = useState('')
    const [productId, setProductId] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/activeproducts`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setProducts(res.data.success) })
            .catch(err => err)

    }, [])




    const handleClose = () => {
        setAdminRedAlert(false)
    }
    const searchData =(searchText,searchCategory)=>{

        console.log(searchCategory, "in searach product")

        let filterType="allproducts";
        if(searchCategory==="blockedproducts") filterType="blocked"
            else if(searchCategory==="deletedproducts") filterType="deleted"
                else if(searchCategory==="activeproducts") filterType="active"
                    else if(searchCategory==="soldproducts") filterType="sold"
                        else if(searchCategory==="inactiveproducts") filterType="inactive"
                            

        axios.post(`${process.env.REACT_APP_DB_HOST}/api/admin/searchproduct`,{id:searchText, type:filterType }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { 
                    if (res.data.success) setProducts([res.data.success])
                    else setProducts([])         })
            .catch(err => err)

    }
    const getProducts = (productType) => {

        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/${productType}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setProducts(res.data.success) })
            .catch(err => err)
    }

    const [adminRedAlert, setAdminRedAlert] = useState(false)

    return (
        <div className="mt-5">
            {adminRedAlert ?
                <ProductListModal
                    productId={productId}
                    getProducts={getProducts}
                    closeHandler={handleClose}
                    adminRedBoxTitle={title}
                    adminRedBoxImage={Art}
                    adminRedCreator={creator}
                />
                : null}

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Product List</h1>
            </div>
            <AdminSearch
                searchData={searchData}
                getData={getProducts} 
                options={[
                    {name:"Active Products", value:"activeproducts"},
                    {name:"Inctive Products", value:"inactiveproducts"}, 
                    {name:"Blocked Products", value:"blockedproducts"},
                    {name:"Deleted Products", value:"deletedproducts"},
                    {name:"Sold Products", value:"soldproducts"},
                    {name:"All Products", value:"allproducts"} ]}
/>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Creator ID</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                
                <tbody>
                {products.length > 0 ? products.map(data => {
                        return <tr className="active-message-body"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setProductId(data._id)
                                setAdminRedAlert(true)
                                setTitle(data.title)
                                setCreator(data.creator)
                                console.log(data)
                            }
                            }
                        >

                            <td>{data.refId}</td>
                            <td>{data.title}</td>
                            <td>{data.creator}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.active?"Active":data.blocked?"Blocked":data.sold?"Sold":data.deleted?"Deleted":"Inactive"}</td>
                        </tr>
                    }
                    ) : null}
                </tbody>
                
            </Table>
            {products.length > 0 ?null:<div><h3>Currently there are no Products to show</h3></div> }
        </div>
    )
}

export default ProductList
