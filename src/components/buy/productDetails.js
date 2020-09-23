import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import '../styles/main.css';
import ProductDetailsForm from './productDetailsForm';
import { POST } from '../lib/post';
import axios from 'axios';
import AlertBox from '../AlertBox/alertBox';
import Color from "../lib/colors"
import Condition from "../lib/condition"
import SigninModal from '../signin/signinModal/signinModal';
import { makeStyles } from '@material-ui/core/styles';
import PasswordReset from '../signin/resetModal';
import ProductMessage from './messagePopup';
import ReportProduct from "../complaints/report"



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const ProductDetails = (props) => {

    const classes = useStyles();
    const { id, showModel, handleClose, url,status,getLastSeen } = props
    const [product, setProduct] = useState("")
    const [showSoldAlertBox, setShowSoldAlertBox] = useState(false)
    const [showActiveAlertBox, setShowActiveAlertBox]=useState(false)
    const [showInactiveAlertBox, setShowInactiveAlertBox]=useState(false)
    const [showDeleteAlertBox, setShowDeleteAlertBox]=useState(false)
    const [favorit, setFavorit]=useState(false)
    const [showSigninModal,setShowSigninModal]=useState(false)
    const [showReset, setShowReset] = useState(false)
    const [showMessagePopup, setShowMessagePopup]= useState(false)
    const [showReportAlertBox, setShowReportAlertBox]=useState(false)
    const [showReportBox, setShowReportBox]=useState(false)
    const [showBlockBox, setShowBlockBox]=useState(false)


    let color=product?Color.filter(color=>color.id===product.color)[0].value:null
    let condition=product?Condition.filter(condition=>condition.id===product.condition)[0].value:null

    const [bgImage, setBgImage] = useState("noimage.png")

    useEffect(() => {

        let config;
        if(localStorage.getItem("c2c-token")) config = {headers:{
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('c2c-token')
        }}
            else config={
                headers:{
                    'Content-Type': 'application/json',
                }
            } 
        axios.get(url ? `${url}/${id}` : `${process.env.REACT_APP_DB_HOST}/api/buy/activeproductdetails/${id}`,config)
           .then(res=>{
               if(res.data.success){
                   setProduct(res.data.success)
                   setFavorit(res.data.favorit)
                   (res.data.success.images.length>0?setBgImage(res.data.success.images[0]):null)
               }
           })
           .catch(err=>err)

        return (async () => {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            await POST(`${process.env.REACT_APP_DB_HOST}/api/account/lastseen`, id, config)
            if(getLastSeen) await getLastSeen()
        })

    }, [id,url,getLastSeen])


    const handleBgImage = (backgroundImage) => {
        setBgImage(backgroundImage)
    }


    const deactivateHandler = async (id) => {
        await axios.post(`${process.env.REACT_APP_DB_HOST}/api/products/inactiveproduct`, { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.data.success) {
                    setShowInactiveAlertBox(false)
                    handleClose()
                    props.history.push({pathname:"/account",mykey:"activities", subKey:"inactive"})
                }
            })
            .catch(err => err)


    }
    const soldHandler = (id) => {
        
        axios.post(`${process.env.REACT_APP_DB_HOST}/api/products/soldproduct`, { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })

            .then(res => {
                if(res.data.success) {
                    setShowSoldAlertBox(false)
                    handleClose()
                   props.history.push({pathname:"/account",mykey:"activities", subKey:"sold"})
                }
            })
            .catch(err => err)
    }
    const activateHandler = (id) => axios.post(`${process.env.REACT_APP_DB_HOST}/api/products/activateproduct`, { data: { id } }, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })

        .then(res => {
            if(res.data.success) {
                setShowActiveAlertBox(false)
                handleClose()
                props.history.push({pathname:"/account",mykey:"activities", subKey:"active"})
            }
        })
        .catch(err => err)
    const deleteHandler = (id) => axios.post(`${process.env.REACT_APP_DB_HOST}/api/products/deleteproduct`, { data: { id } }, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })

        .then(res => {
            if(res.data.success) {
                setShowSoldAlertBox(false)
                handleClose()
                props.history.push("/")
            }
        })
        .catch(err => err)
    
   

    const editHandler = (id) => props.history.push(`./editproduct/${id}`)

    

    const favoriteHandler = async(id) => {
         if (localStorage.getItem("c2c-token")) {
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        }
        let response = await POST(`${process.env.REACT_APP_DB_HOST}/api/account/setfavorities`, id, config)
        if (response.data.status === "success") {
            setFavorit(!favorit)
            setShowSigninModal(false)
        }  
        setShowSigninModal(false)
    }
    else setShowSigninModal(true) 

}
const messageHandler=async(id)=>{

    if (localStorage.getItem("c2c-token")) {
        setShowSigninModal(false) 
        setShowMessagePopup(true)


    }
    else 
        setShowSigninModal(true) 
}

const reportHandler = () => setShowReportAlertBox(true)

const blockHandler=(id)=>{
    console.log("block handler called")
    axios.post(`${process.env.REACT_APP_DB_HOST}/api/admin/blockproduct`, { data: { id } }, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })

        .then(res => {
            if(res.data.success) {
                setShowBlockBox(false)
                handleClose()
            }
        })
        .catch(err => err)}

    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <Zoom>
            
                <div>
                
                    <ProductDetailsForm
                        description={product.description}
                        postedBy={product ? product.creator.firstName : null}
                        creatorId={product ? product.creator._id : null}
                        productId={product._id}
                        color={color}
                        price={product.price}
                        condition={condition}
                        quantity={product.quantity}
                        title={product.title}
                        bgImage={bgImage}
                        images={product.images}
                        handleBgImage={handleBgImage}
                        deactivateHandler={()=>setShowInactiveAlertBox(true)}
                        activateHandler={()=>setShowActiveAlertBox(true)}
                        deleteHandler={()=>setShowDeleteAlertBox(true)}
                        editHandler={editHandler}
                        reportHandler={reportHandler}
                        favoriteHandler={favoriteHandler}
                        soldHandler={()=>setShowSoldAlertBox(true)}
                        handleClose={handleClose}
                        status={status}
                        favorit={favorit}
                        messageHandler={messageHandler}
                        blockHandler={()=>setShowBlockBox(true)}
                        
                    />
                </div>
            </Zoom>
            {showSoldAlertBox?
                    <AlertBox
                        alertBoxTitle="Sold" 
                        alertBoxBody="Do you want to mark it sold?"
                        proceedHandler={()=>soldHandler(id)}
                        hideAlertBox={()=>setShowSoldAlertBox(false)} />
                        :null}
            {showActiveAlertBox?
                    <AlertBox
                        alertBoxTitle="Mark Active" 
                        alertBoxBody="Do you want to mark it Active?"
                        proceedHandler={()=>activateHandler(id)}
                        hideAlertBox={()=>setShowActiveAlertBox(false)} />
                        :null}
            {showInactiveAlertBox?
                    <AlertBox
                        alertBoxTitle="Mark Inactive" 
                        alertBoxBody="Do you want to mark it Inactive?"
                        proceedHandler={()=>deactivateHandler(id)}
                        hideAlertBox={()=>setShowInactiveAlertBox(false)} />
                        :null}
            {showDeleteAlertBox?
                    <AlertBox
                        alertBoxTitle="Delete" 
                        alertBoxBody="Are you sure to delete it?"
                        proceedHandler={()=>deleteHandler(id)}
                        hideAlertBox={()=>setShowDeleteAlertBox(false)} />
                        :null}
            {showReportAlertBox?
                    <AlertBox
                        alertBoxTitle="Report!" 
                        alertBoxBody="Are you sure to report this product?"
                        proceedHandler={()=>{
                            setShowReportAlertBox(false)
                            setShowReportBox(true)}}
                        hideAlertBox={()=>setShowReportAlertBox(false)} />
                        :null}

            {showSigninModal?
            <SigninModal 
                    handleClose={()=>setShowSigninModal(false)}
                    show={showSigninModal}
                    classes={classes}
                    productSubmitHandler={()=>setShowSigninModal(false)}
                    handleCloseReset={()=>setShowReset(false)}
                    handleOpenReset={()=>{
                                        setShowSigninModal(false)
                                        setShowReset(true)}}
                    showReset={showReset} />:null}


            {showReset ? 
                <PasswordReset
                    handleClose={()=>setShowReset(false)}
                    handleOpen={()=>setShowReset(true)}
                    show={showReset} 
                    classes={classes}
            />
                : null} 
            {showMessagePopup?
                <ProductMessage
                    hideAlertBox={()=>setShowMessagePopup(false)}
                    title={product.title}
                    productId={product._id}
                    recipentId={product ? product.creator._id : null}
                    recipentName={product ? product.creator.firstName : null}
                    {...props}
                />
                :null}
            {showReportBox?
                <ReportProduct
                    hideAlertBox={()=>setShowReportBox(false)}
                    title={product.title}
                    productId={product._id}
                    creatorId={product ? product.creator._id : null}
                    {...props}
                />
                :null  }
            {showBlockBox?
                 <AlertBox
                 alertBoxTitle="Block Product" 
                 alertBoxBody="Are you sure you want to block this product?"
                 proceedHandler={()=>blockHandler(id)}
                 hideAlertBox={()=>setShowBlockBox(false)} />
                :null  }                                     
            </div>

    );
}

export default ProductDetails;