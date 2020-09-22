import React, { useState } from 'react'
const GlobalContextContext = React.createContext();



const GlobalContextProvider = (props) => {


    const [profile, setProfile] = useState({
        auth: false,
        favorities: [],
        name: false,
        userId: false,
        email: false,
        admin: false
    })

    return (
        //<GlobalContext.Provider value={[auth,setAuth,favorities,setFavorities,name,setName,userId,setUserId]}>
        <GlobalContextContext.Provider value={[profile, setProfile]}>

            {props.children}
        </GlobalContextContext.Provider>
    );
};
export { GlobalContextProvider, GlobalContextContext }



