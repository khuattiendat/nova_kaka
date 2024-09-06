import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ModalRegister = ({show, handleClose, handleShow}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    }
    return (
        <Modal show={show} onHide={handleClose} className='modal_login'>
            <Modal.Header>
                <Modal.Title>Đăng Ký tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type='password'
                                      required
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type='password'
                                      required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type={"submit"} variant="primary">
                    Đăng ký
                </Button>
            </Modal.Footer>
            <button onClick={handleShow} className={'btn-link btn fs-3'}>Đăng nhập</button>
        </Modal>
    )

}
export default ModalRegister;