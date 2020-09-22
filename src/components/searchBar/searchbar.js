import React, {  useState, useEffect } from 'react';
import "./searchbar.css";
import Categories from "../lib/categories"


export default function SearchBar(props) {

  let items = [];
  if (props.products) items = props.products.map(product => product.title)

  const [suggestions, setSuggestions] = useState("")
  const [searchText, setSearchText] = useState("")
  const [searchCategory, setSearchCategory] = useState("")

  useEffect(()=>{
    setSearchCategory(props.category)
  },[])

  const changeHandler = (e) => {
    const text = e.target.value;
    let suggestionArray = [];
    if (text.length > 0) {
      let length = text.length;
      suggestionArray = (items.sort().filter(v =>  v.toLowerCase().slice(0, length).includes(text.toLowerCase(), 0))).slice(0, 10)
      setSearchText(e.target.value)
    }
    setSuggestions(suggestionArray) 
    setSearchText(e.target.value)
  }

  const suggestionSelector = (value) => {
    setSearchText(value)
    setSuggestions("")
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if ((searchText.length<1) && (searchCategory===props.category))  return
      else{
        props.history.push({
          pathname: `/categories/${Categories.filter(key=>key.id===searchCategory)[0].linkName}`,
          search: `?query=${searchText}`
        })
        props.searchHandler(searchText, searchCategory)
      }
    
  
  }

  return (
    <div className="container">

      <form onSubmit={submitHandler} noValidate="novalidate">
        <div className="row ">
          <div className=" AutoComplete col-lg-5 col-md-4 col-sm-12 p-2">
            <input autoComplete="off" type="text" name="searchText" className="form-control" 
              value={searchText} placeholder="Type your Search here !"
              onChange={changeHandler} />
            <ul>
              {suggestions.length > 0 ?
                suggestions.map((item, index) => <li key={index} onClick={() => suggestionSelector(item)} >{item}</li>)
                : null}
            </ul>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12 p-2">
            <select className="form-control search-slt" 
                    name="searchCategory" 
                    defaultValue={props.category}
                    onChange={(e)=>setSearchCategory(parseInt(e.target.value))}>

              {Categories.map((key, index) => <option value={key.id}>{key.value}</option>)}
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

