import React, { useEffect } from 'react';
import '../styles/main.css';
import LastSeenDescription from './lastSeenDescription';
import Products from "../buy/products"


const LastSeen = (props) => {
    const {favorit,favoritHandler , getLastSeen,lastSeenProducts} = props
  

    useEffect(() => {
        
        if (localStorage.getItem("c2c-token")) getLastSeen();
        else props.unAuthenticated()


    }, [])
    

    return (
        <div>
            {props.auth ?
                <div className="wrapAll">
                    <h2>Last Seen</h2>
                    <div className="row wrapAll-cads">
                        <Products
                            products={lastSeenProducts}
                            setTargetProduct={props.setTargetProduct}
                            favorit={favorit}
                            favoritHandler={favoritHandler}
                            getLastSeen={getLastSeen}
                            
                        />
                    </div>
                </div>
                : <LastSeenDescription />
            }
        </div>
    );
}
export default LastSeen;