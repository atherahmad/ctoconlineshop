import React,{useState} from 'react'
import SellItems from '../../sell/sellitems'
import axios from "axios"



function EditProduct(props) {

    const id = props.match.params.id

    const editHandler=async(product, images)=>{

        let blob = await fetch("/avatars/a1589803503629.jpeg").then(r => r.blob());
        let config = {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-type': 'multipart/form-data'
            }
        }
    
        const formData = new FormData();
        
        if (images.length > 0) {
            let imageArray = images.map(value => value.image)
            imageArray.forEach(value => formData.append("files", value))
        }

        Object.keys(product).forEach(
            key => {
                    if(key==="creator") formData.append(key,id)
                      else formData.append(key, product[key])
                    })
          
        axios.post("/api/account/editproduct", formData, config)
                    .then(res=>{
                        if(res.data.status==="success"){
                            props.history.push({pathname:"/account",mykey:"activities"})
                    }})
                    .catch(err=>err)
    }


    return (
        <div>
        {console.log("id in edit", id)}
            <SellItems id={id} 
                {...props}
                editHandler={editHandler}
                />
        </div>
    )
}

export default EditProduct
