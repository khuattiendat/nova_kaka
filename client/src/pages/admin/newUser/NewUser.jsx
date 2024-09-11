import Form from "../../../components/add/Form.jsx";
import "./newUser.scss";
import {useEffect, useState} from "react";
import {inputDataUser} from "../../../utils/data/userData.js";
import {inputDataExam} from "../../../utils/data/examData.js";
import {useNavigate, useParams} from "react-router-dom";
import {createAxios} from "../../../utils/createInstance.js";
import Loading from "../../../components/loading/loadingSpin/Loading.jsx";
import {getQuestionById} from "../../../apis/question.js";
import {getExamById} from "../../../apis/exam.js";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const NewUser = ({type, isEdit}) => {
    const params = useParams();
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const {id} = params;
    const [data, setData] = useState({})
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    // set columns
    useEffect(() => {
        switch (type) {
            case 'user':
                setColumns(inputDataUser)
                break;
            case 'exam':
                setColumns(inputDataExam)
                break;
            default:
                break;
        }

    }, [])
    const fetchData = async () => {
        switch (type) {
            case 'exam':
                try {
                    setLoading(true)
                    let exam = await getExamById(id);
                    setData(exam.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break;
            case 'question':
                try {
                    setLoading(true)
                    let question = await getQuestionById(id);
                    setData(question.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('Bạn không có quyền truy cập', {
                autoClose: 1000,
            })
            navigate('/admin/login')
        }
        if (isEdit) {
            fetchData();
        }
    }, [id])
    return (
        <div className='newUser'>
            {
                loading ? <Loading/> : (
                    <div>
                        {
                            isEdit && Object.keys(data).length > 0 &&
                            <Form isEdit={isEdit} _data={data} type={type} columns={columns}/>
                        }
                        {
                            !isEdit && <Form type={type} columns={columns}/>
                        }
                    </div>
                )
            }


        </div>
    )
}
export default NewUser;