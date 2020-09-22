import {post} from "axios"

const POST = async (url,data,config)=>{

return await post(url,{data},config)
    .then(res=>res)
    .catch(err=>err)
}

const IMGPOST = async (url, formData, config)=>{

    return await post(url, formData, config)
                    .then(res=>res)
                    .catch(err=>err)
    }
export{POST, IMGPOST}
