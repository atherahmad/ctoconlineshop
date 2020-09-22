import React from 'react';
import { Modal, Button } from 'react-bootstrap'


import './style.css'


const MyModal = ({ showModel, handleClose, title, description, images }) => {

    return (
        <div>
            <Modal show={showModel} onHide={handleClose}
            // dialogClassName="modal-90w"
            // aria-labelledby="example-custom-modal-styling-title" 
            >
                <Modal.Header closeButton>
                    <Modal.Title >{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-image">
                        <img src={`http://localhost:5000/avatars/${images ? images[0] : null}`} alt="" />
                    </div>
                    <div>
                        {description}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyModal;