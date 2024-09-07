import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './modalRandom.scss'
import React from "react";

const ModalRandom = ({show, handleClose, data}) => {
    return (
        <div>

            <Modal show={show} onHide={handleClose} className='modal_random'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center w-100'>Kết quả bốc thăm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="icon">
                        <img src="/image/trophy.png" alt="Trophy Icon"/>
                    </div>
                    <h1>XIN CHÚC MỪNG!</h1>
                    <h2 className="winner-name">{data?.name}</h2>
                    <h3 className="winner-id">{data?.phone}</h3>
                    <p className="message">đã may mắn nhận giải.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default ModalRandom;