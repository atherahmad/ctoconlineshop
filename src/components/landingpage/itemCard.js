import React, { useState, useEffect,useContext } from 'react';
import Slide from 'react-reveal/Slide';
import { POST } from "../lib/post"
import  {GlobalContextContext} from "../Context/contextApi"

const ItemCard = ({ title, price, id, images, setTargetProduct, url, favoritHandler,status  }) => {

    const [favoritized, setFavoritized] = useState(false)
    const [profile, setProfile] = useContext(GlobalContextContext)

    useEffect(() => {
     if (profile.favorities.includes(id)) setFavoritized(true)
         else setFavoritized(false)
    }, [id,favoritized,profile.favorities]);

    const setFvorities = async () => {
        if (localStorage.getItem("c2c-token")) {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            let response = await POST("/api/account/setfavorities", id, config)
            if (response.data.status === "success") {
                setFavoritized(!favoritized)
                favoritHandler() 
            }
        }
    }
    return (

        <div>
            <div className="unitedWrap ">
                <Slide left>
                    <div className="unitedCards" key={id} >
                        <button className={favoritized ? "myFavButton fa fa-star " : "myFavButton fa fa-star-o "} onClick={setFvorities}></button>
                        <div className="unitedImgBox" onClick={() => setTargetProduct(id, url,status)}
                            style={{
                                backgroundImage: `url(${`http://localhost:5000/avatars/${images}`})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                        </div>
                        <div className="unitedContent">
                            <div className="unitedPrice">
                                <h5> Price : {price}€</h5>
                            </div>
                            <h3>{title}</h3>
                        </div>
                    </div>
                </Slide>
            </div>
        </div>
    );
}

export default ItemCard;

// redux/favorites.js

/* import { connect } from 'react-redux'

export const reducer = ( state={list:[]}, action )=>{
    switch(action.type){
        case "fav/set": return {...state, list:action.list, loaded:true };
        case "fav/add": return {...state, list:state.list.concat([action.id]) };
        case "fav/del": return {...state, list:state.list.filter( item => item != action.id ) };
        default: return state;
    }
};

const setFavorite = async (id)=> {
    if ( localStorage.getItem("c2c-token") ){
        const config={
            headers:{
                'x-auth-token':localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        }
        let response = await POST("/api/account/setfavourities", id, config)
    }
}

export const actions = ( dispatch ) => ({ favoriteActions: {
    fetch: async () => {
        if( ! localStorage.getItem("c2c-token") ) return;
        let response = await GET("/api/account/getfavourities")
        if ( response.data.status === "success" )
            dispatch({type:'fav/set',list:response.data.favourities})
    },
    set: list => dispatch({type:'fav/set',list}),
    add:   id => { setFavorite(id); dispatch({type:'fav/add',id}) },
    del:   id => { setFavorite(id); dispatch({type:'fav/del',id}) },
}});

export const withFavorites = connect(
    state => { favorites: state.favorites.list },
    actions
);

// useCase
import { withFavorites } from '../redux/favourites'

withComponents ( function({productId,favorites,favoriteActions}){
    if ( ! favorites.loaded ) favoriteActions.fetch();
    return favorites.includes(productId)
    ? <Button onClick={favoriteActions.add(productId)}>yay</Button>
    : <Button onClick={favoriteActions.del(productId)}>nay</Button>
    ;
})  */
