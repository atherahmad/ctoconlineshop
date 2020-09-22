import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAlert = (props) => {
    const { id, alertText, redirectPath } = props
    toast.success(alertText, { containerId: "A", autoClose: 1000 })
    toast.warn(alertText, { containerId: "B", autoClose: 1000 })
    toast.info(alertText, { containerId: "C", autoClose: 1000 })

    useEffect(() => {
        const timer = setTimeout(() => {

            props.history.push({pathname:redirectPath,mykey:"activities"})
        }, 1000);
        return () => clearTimeout(timer);

    }, []);

    return (
        <>
            <ToastContainer
                enableMultiContainer
                containerId={id}
                position={toast.POSITION.TOP_CENTER} />
        </>
    );
}

export default MyAlert;

