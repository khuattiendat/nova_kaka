import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import {Link, useNavigate} from "react-router-dom";
import {showAlertConfirm} from "../../utils/showAlert.js";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {createAxios} from "../../utils/createInstance.js";
import moment from "moment";
import {deleteUser} from "../../apis/user.js";
import {deleteQuestion} from "../../apis/question.js";
import {deleteExam} from "../../apis/exam.js";
import Loading from "../loading/loadingSpin/Loading.jsx";
import {useSelector} from "react-redux";


const DataTable = (props) => {
    const {columns, rows, type, loading} = props;
    // const user = useSelector(state => state.user)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate();
    const [_loading, setLoading] = useState(false);
    const handleDeleteUser = async (id) => {
        try {
            setLoading(true);
            if (id.toString() === user._id.toString()) {
                toast.error("Không thể xóa tài khoản của bạn", {
                    autoClose: 1000
                });
                return;
            }
            await deleteUser(id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
    const handleDeleteExam = async (id) => {
        try {
            setLoading(true)
            await deleteExam(id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
    const handleDeleteQuestion = async (id) => {
        try {
            setLoading(true)
            await deleteQuestion(id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        let confirm = await showAlertConfirm("Bạn có chắc chắn muốn xóa?", "Dữ liệu sẽ không thể khôi phục");
        if (confirm) {
            switch (type) {
                case "user":
                    await handleDeleteUser(id);
                    break;
                case "exam":
                    await handleDeleteExam(id);
                    break;
                case "question":
                    await handleDeleteQuestion(id);
                    break;
                default:
                    break;
            }
        }
    }
    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 250,
        align: "center",
        renderCell: (params) => {
            return (
                <div className="action">
                    {
                        type !== 'data' &&
                        <Link to={type === 'user' ? '#' : `/admin/${type}/sua/${params.row._id}`}
                              className={type === 'user' ? 'btn disabled' : 'btn btn-secondary'}>
                            Sửa
                        </Link>
                    }

                    {
                        type !== 'data' &&
                        <div className="delete" onClick={() => handleDelete(params.row._id)}>
                            <button className='btn btn-danger'>Xóa</button>
                        </div>
                    }
                    {
                        type === 'exam' &&
                        <Link to={`/admin/data/${params.row._id}`}
                              className='btn btn-primary'>
                            Data
                        </Link>
                    }

                </div>
            );
        },
    };
    useEffect(() => {
        if (type === 'user') {
            rows.map(row => {
                row.createdAt = moment(row.createdAt).format('DD/MM/YYYY HH:mm:ss')
            })
        } else if (type === 'exam') {
            rows.map(row => {
                row.members = row.members?.length
                row.createdBy = row?.createdBy?.name
                row.title = new DOMParser().parseFromString(row.title, "text/html").body.textContent
            })
        } else if (type === 'question') {
            if (rows.length > 0) {
                rows.map(row => {
                    if (row.options) {
                        row.question = new DOMParser().parseFromString(row.question, "text/html").body.textContent
                        const correctOption = row?.options?.find(option => option.isAnswer);
                        row.answer1 = new DOMParser().parseFromString(row?.options[0]?.option, "text/html").body.textContent
                        row.answer2 = new DOMParser().parseFromString(row?.options[1]?.option, "text/html").body.textContent
                        row.answer3 = new DOMParser().parseFromString(row?.options[2]?.option, "text/html").body.textContent
                        row.answer4 = new DOMParser().parseFromString(row?.options[3]?.option, "text/html").body.textContent
                        row.correct_answer = new DOMParser().parseFromString(correctOption?.option, "text/html").body.textContent
                    }
                })
            }


        }
    }, [type, rows])
    return (
        <div className="dataTable">
            {

                <DataGrid
                    loading={loading || _loading}
                    className="dataGrid"
                    rows={rows}
                    columns={[...columns, actionColumn]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {debounceMs: 500},
                        },
                    }}
                    getRowId={(row) => row._id}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                    autoHeight
                />
            }
        </div>
    );
};

export default DataTable;
