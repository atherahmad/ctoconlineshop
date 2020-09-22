import {get} from "axios"

const GET = async (url)=>{
   return await get(url,{
        headers:{
            'x-auth-token':localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res)
    .catch(err=>err)
}
export default GET;