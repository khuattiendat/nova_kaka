import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalLogin.scss'
import {Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {login} from "../../../apis/user.js";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../../redux/userSlice.js";

const ModalLogin = ({show, handleClose, handleShow}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        userName: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!data.userName) {
            toast.warn('Vui lòng nhập tên đăng nhập', {
                autoClose: 1000
            })
            return
        }
        if (!data.password) {
            toast.warn('Vui lòng nhập mật khẩu', {
                autoClose: 1000
            })
            return
        }
        try {
            const res = await login(data)
            dispatch(setUser(res?.data?.user))
            dispatch(setToken(res?.data?.accessToken))
            localStorage.setItem('accessToken', res?.data?.accessToken)
            await handleClose()
            setData({
                userName: '',
                password: ''
            })
            toast.success('Đăng nhập thành công', {
                autoClose: 1000
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal show={show} onHide={handleClose} className='modal_login'>
            <Modal.Header>
                <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            value={data.userName}
                            onChange={handleChange}
                            name='userName'
                            type="text"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            value={data.password}
                            onChange={handleChange}
                            name='password' type='password'/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' onClick={handleSubmit}>
                    Đăng nhập
                </Button>
            </Modal.Footer>
            <button onClick={handleShow} className={'btn-link btn fs-3'}>Đăng ký tài khoản</button>
        </Modal>
    )
}
export default ModalLogin;