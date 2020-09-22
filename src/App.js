import React from 'react';

import { GlobalContextProvider } from "./components/Context/contextApi"

import AppSupport from './AppSupport';

function App() {

    return (
        <div className="App">
            <GlobalContextProvider>
                <AppSupport/>
            </GlobalContextProvider>
        </div>
    );
}
export default App;
