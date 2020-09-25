import React, {  useState, useEffect } from 'react';
import "./searchbar.css";

export default function AdminSearch({options, getData, searchData}) {

  const [searchCategory, setSearchCategory] = useState([])

  useEffect(()=>{
    setSearchCategory(options)
  },[])


  const submitHandler = (e) => {
      e.preventDefault();
      searchData(e.target.searchText.value,e.target.searchCategory.value)
      e.target.searchText.value=""
  }

  return (
    <div className="container">

      <form onSubmit={submitHandler} noValidate="novalidate">
        <div className="row ">
          <div className=" AutoComplete col-lg-5 col-md-4 col-sm-12 p-2">
            <input autoComplete="off" 
              type="text" 
              name="searchText" 
              className="form-control" 
              placeholder="Type your Search here !"
 />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12 p-2">
            <select className="form-control search-slt" 
                    name="searchCategory" 
                    defaultValue={searchCategory[0]}
                    onChange={(e)=>getData(e.currentTarget.value)}>

              {searchCategory.map((key, index) => <option value={key.value}>{key.name}</option>)}
            </select>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 p-2">
            <button type="submit" className="myBlueButton-sm wrn-btn">Search</button>
          </div>
        </div>

      </form>
    </div>

  )
}

