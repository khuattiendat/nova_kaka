import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import './list.scss';
import DataTable from "../../../components/dataTable/DataTable.jsx";
import {questionColumns} from "../../../utils/data/questionData.js";
import {userColumns} from "../../../utils/data/userData.js";
import {dataColumns, examColumns} from "../../../utils/data/examData.js";
import {useEffect, useState} from "react";
import {getAllUser} from "../../../apis/user.js";
import {getAllQuestion} from "../../../apis/question.js";
import {getAllExam, getMemberExam} from "../../../apis/exam.js";
import {toast, ToastContainer} from "react-toastify";
import * as XLSX from 'xlsx';

const List = ({type}) => {
    // const user = useSelector(state => state.user);
    const params = useParams()
    const {id} = params;
    const user = JSON.parse(sessionStorage.getItem('user'))
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
            case 'data':
                try {
                    setLoading(true);
                    const res = await getMemberExam(id)
                    setColumns(dataColumns);
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
    const handleExport = () => {
        const data = rows.filter(row => row.role !== 'admin')
            .map(row => {
                return {
                    'Họ và Tên': row.name,
                    'Số điện thoại': row.phone,
                }
            });
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };
    return (
        <div className="users">
            <div className="info">
                <h1>{type}</h1>
                <div className='d-flex justify-content-between align-items-center my-3 mx-3'>
                    <Link
                        to={type === 'user' ? '#' : `/admin/${type}/them-moi`}
                        className={type === 'user' ? 'btn btn-secondary disabled' : 'btn btn-secondary'}>Thêm
                        mới {type}</Link>
                    {
                        (type === 'data' || type === 'user') &&
                        <button onClick={handleExport} className='btn btn-primary'>Xuất dữ liệu</button>
                    }

                </div>

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