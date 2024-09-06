import {useNavigate} from "react-router-dom";
import Header from "../../../components/header/Header.jsx";
import './listExam.scss'
import {useEffect, useState} from "react";
import {getExamComing, updateMemberExam} from "../../../apis/exam.js";
import {toast} from "react-toastify";
import Loading from "../../../components/loading/loadingText/Loading.jsx";

const ListExam = () => {
    const navigate = useNavigate();
    const [listExam, setListExam] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [loading, setLoading] = useState(false)
    const fetchApi = async () => {
        try {
            setLoading(true)
            const res = await getExamComing();
            setListExam(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        localStorage.removeItem('time')
        localStorage.removeItem('index')
        fetchApi()
    }, [])
    const handleClick = async (id) => {
        try {
            let payload = {
                userId: user._id,
                examId: id
            }
            await updateMemberExam(payload)
            toast.success('Tham gia thành công', {
                autoClose: 500,
            })
            navigate(`/phong-cho/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='list-exam'>
            <Header/>
            <div className='d-block d-sm-none'>
                <div className='head__mb'>
                    <img src="/image/Rectangle%201.png" alt=""/>
                </div>
            </div>
            <div className='container'>
                <h2 className='title fs-6 text-md-center text-start'>Cuộc thi đang diễn ra</h2>
                <div className='row g-3'>
                    {
                        loading ? <Loading/> :
                            listExam.length > 0 ? listExam.map((item, index) => {
                                    return (
                                        <div className='col-md-6 col-12 ' key={index}>
                                            <div className='exam-item p-md-3 p-2'>
                                                <span className='fs-3'>{item.title}</span>
                                                <button className='fs-6 p-2 p-md-3'
                                                        onClick={() => handleClick(item?._id)}>Tham gia
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            ) : <div className='text-start fs-5 fw-bold'>Không có cuộc thi nào</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default ListExam;