import Form from "../../../components/add/Form.jsx";
import "./newUser.scss";
import {useEffect, useState} from "react";
import {inputDataUser} from "../../../utils/data/userData.js";
import {inputDataExam} from "../../../utils/data/examData.js";
import {useParams} from "react-router-dom";
import {createAxios} from "../../../utils/createInstance.js";
import Loading from "../../../components/loading/loadingSpin/Loading.jsx";
import {getQuestionById} from "../../../apis/question.js";
import {getExamById} from "../../../apis/exam.js";

const NewUser = ({type, isEdit}) => {
    const params = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const {id} = params;
    const [data, setData] = useState({})
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosJWT = createAxios();
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
                    let question = await getQuestionById(id, accessToken, axiosJWT);
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