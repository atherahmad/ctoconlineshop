import React from 'react';
import { Tab, Tabs } from 'react-bootstrap'
import '../../styles/main.css'
import ActiveProducts from './activeProducts';
import InactiveProducts from './inactiveProducts';
import SoldProducts from './soldProducts';


const Activity = (props) => {
    const { favorit, favoritHandler, setTargetProduct } = props

    return (

        <div className="border shadow milad">
            <Tabs
                id="uncontrolled-tab-example"
                mountOnEnter={true}
                unmountOnExit={true}
                variant='pills'
                defaultActiveKey={props.location.subKey ? props.location.subKey : "active"}
                className="d-flex justify-content-center ml-2"
            >
                <Tab eventKey="active" title="Active Products" className="col-lg-12 col-md-12 col-sm-12" >
                    <ActiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="inactive" title="Inactive Products" className="col-lg-12 col-md-12 col-sm-12"  >
                    <InactiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="sold" title="Sold Products" className="col-lg-12 col-md-12 col-sm-12"  >
                    <SoldProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>


            </Tabs>
        </div>



    );
}

export default Activity;