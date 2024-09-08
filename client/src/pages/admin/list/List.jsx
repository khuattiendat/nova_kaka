import {Link, useLocation, useNavigate} from "react-router-dom";
import './list.scss';
import DataTable from "../../../components/dataTable/DataTable.jsx";
import {questionColumns} from "../../../utils/data/questionData.js";
import {userColumns} from "../../../utils/data/userData.js";
import {examColumns} from "../../../utils/data/examData.js";
import {useEffect, useState} from "react";
import {createAxios} from "../../../utils/createInstance.js";
import {getAllUser} from "../../../apis/user.js";
import {getAllQuestion} from "../../../apis/question.js";
import {getAllExam} from "../../../apis/exam.js";
import {toast, ToastContainer} from "react-toastify";

const List = ({type}) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const {state} = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const fetchData = async () => {
        switch (type) {
            case 'user':
                try {
                    setLoading(true);
                    const res = await getAllUser();
                    setColumns(userColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
                break;
            case 'question':
                try {
                    setLoading(true);
                    const res = await getAllQuestion();
                    setColumns(questionColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
                break;
            case 'exam':
                try {
                    setLoading(true);
                    const res = await getAllExam()
                    setColumns(examColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                    setLoading(false);
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
        fetchData();

    }, [state, type])

    return (
        <div className="users">
            <div className="info">
                <h1>{type}</h1>
                <Link
                    to={type === 'user' ? '#' : `/admin/${type}/them-moi`}
                    className={type === 'user' ? 'btn btn-secondary mb-3 disabled' : 'btn btn-secondary mb-3'}>Thêm
                    mới {type}</Link>
            </div>
            {
                rows.length === 0 && <div className="empty">Không có dữ liệu</div>
            }
            <DataTable loading={loading} type={type} columns={columns} rows={rows}/>
            <ToastContainer/>
        </div>
    );
}
export default List;