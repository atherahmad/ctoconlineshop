import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import '../styles/main.css';
import axios from "axios"

function ReportProduct(props) {

    const {hideAlertBox,title, productId, creatorId}=props

    const [message, setMessage] = useState("")
    const [reportStauts,setReportStatus]=useState(false)
    const changeHandler = (e) => {
        setMessage(e.target.value)
      }
      const submitHandler = async () => {
        const productReport = {
          productId,
          creatorId,
          title,
          message
        }
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
          }
        }
        axios.post("/api/contact/report", productReport, config)
        .then(res=>{
            if(res.data.success) setReportStatus(true) 
        })
        .catch(err=>err)
      }
    return (
        <div className="rpd">
        <div className="rpd-content">
            <div className="rpd-head">
            </div>
            <div className="rpd-head-title">
                Report Product
            </div>
            
            <div className="rpd-tilte">
                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >Product Title : {title}</InputLabel>
                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >Product Id : {productId}</InputLabel>

                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >To : Admin</InputLabel>

                {reportStauts?
                    <h3>We have successfully recieved your complaint regarding this product and will take action accordingly.</h3>:
                    <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    name="description"
                    multiline
                    rows={4}
                    placeholder="Write Your Message Here"
                    variant="outlined"
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    onChange={changeHandler}

                />}
            </div>
                {reportStauts?
                <div className="alertBox-body">
                        <button type="button" className="myRedButton-lg" onClick={hideAlertBox}>Close</button>
                </div>:
                <div className="alertBox-body">
                      <button type="button" className="myRedButton-lg" onClick={submitHandler}>Report</button>
                      <button type="button" className="myBlueButton-lg ml-1" onClick={hideAlertBox}>Cancel</button>

              </div>}
            </div>
        </div>
    )
}

export default ReportProduct
