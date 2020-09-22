import React , {useState, useEffect} from 'react'
import FilterBarForm from './filterBarForm'
import Categories from '../lib/categories'
import Colors from '../lib/colors'
import Prices from '../lib/price'
import Conditions from '../lib/condition'


export default function FilterBar(props) {


    const [colors, setColors] = useState(Colors)
    const [categories, setCategories] = useState(Categories)
    const [prices, setPrices] = useState(Prices)
    const [conditions, setConditions] = useState(Conditions)
    const {filterHandler} = props

   

    return (
        <div>
            <FilterBarForm
                categories      =   {categories}
                colors          =   {colors}
                prices          =   {prices}
                conditions      =   {conditions}
                filterHandler   =   {filterHandler}
            />
        </div>
    )
}
