import './login.scss'
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {login} from "../../../apis/user.js";
import Loading from "../../../components/loading/loadingText/Loading.jsx";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/userSlice.js";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        phone: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setLoading(true)
            const res = await login(data)
            if (res.data.role !== 'admin') {
                toast.error('Bạn không có quyền truy cập', {
                    autoClose: 1000,
                })
                return
            }
            toast.success('Đăng nhập thành công', {
                autoClose: 1000,
            })
            dispatch(setUser(res.data))
            navigate('/admin')
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
            toast.error(e?.response?.data?.message, {
                autoClose: 1000,
            })
        }
    }
    return (
        <section className="vh-100 bg-image"
                 style={{
                     backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
                     backgroundSize: "cover",
                 }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{
                                borderRadius: "15px",
                            }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Đăng nhập</h2>
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example1cg">Số điện
                                                thoại</label>
                                            <input type="text" id="form3Example1cg"
                                                   required
                                                   name='phone'
                                                   onChange={handleChange}
                                                   value={data.phone}
                                                   className="form-control form-control-lg"/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4cdg">
                                                Mật khẩu
                                            </label>
                                            <input type="password" id="form3Example4cdg"
                                                   required
                                                   name='password'
                                                   onChange={handleChange}
                                                   value={data.password}
                                                   className="form-control form-control-lg"/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                                                {
                                                    loading ? <Loading/> : 'Đăng nhập'
                                                }
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login