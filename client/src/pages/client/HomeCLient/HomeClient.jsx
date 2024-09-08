import './home.scss'
import {useState} from "react";
import {toast} from "react-toastify";
import {createUser} from "../../../apis/user.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Loading from "../../../components/loading/loadingText/Loading.jsx";


const HomeClient = () => {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (data.name === '' || data.phone === '') {
                toast.warn('Vui lòng điền đầy đủ thông tin', {
                    autoClose: 500,
                })
                return
            }
            const res = await createUser(data);
            navigate('/danh-sach-cuoc-thi')
            sessionStorage.setItem('user', JSON.stringify(res.data))
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
            toast.error('Đã có lỗi xảy ra', {
                autoClose: 500,
            })
        }

    }
    return (
        <div className='home_client'>
            <div className='container px-md-5 m-sm-3 w-100 h-100'>
                <div className='row'>
                    <div className='col-md-6'></div>
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
                            <div className='img'>
                                <img src="/image/Rectangle 1.png" alt=""/>
                            </div>
                            <div className='form-box'>
                                <h2 className='title'>Điền thông tin của bạn</h2>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Họ và Tên</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           name='name'
                                           value={data.name}
                                           onChange={handleChange}
                                           aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Số điện thoại</label>
                                    <input type="text" className="form-control"
                                           name='phone'
                                           value={data.phone}
                                           onChange={handleChange}
                                           id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    {loading ? <Loading/> : 'Bắt đầu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeClient;