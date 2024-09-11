import "./add.scss";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../../styles/custom.scss'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Loading from "../loading/loadingSpin/Loading.jsx";
import {createQuestion, updateQuestion} from "../../apis/question.js";
import {createExam, updateExam} from "../../apis/exam.js";
import {useSelector} from "react-redux";

const Form = (props) => {
    const {isEdit, type, columns, _data} = props;
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    console.log(_data)
    //
    const [time, setTime] = useState(60);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([
        {option: '', isAnswer: false},
        {option: '', isAnswer: false},
        {option: '', isAnswer: false},
        {option: '', isAnswer: false}
    ]);
    const handleChangeOptions = (index, editor) => {
        let data = editor.getData();
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index].option = data;
            return newOptions;
        });
    }
    //
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(_data)
        if (isEdit && _data) {
            setQuestion(_data.question)
            setOptions(_data.options)
            setTime(_data.time)
            setData(_data)
        }
    }, [])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }
    // exam
    const handleCreateExam = async (data) => {
        let payload = {
            title: data.title,
            startTime: data.startTime,
            endTime: data.endTime,
            date: data.date,
            numberOfQuestions: data.numberOfQuestions,
            createdBy: user._id,
        }
        try {
            setLoading(true)
            await createExam(payload);
            toast.success('Thêm mới thành công', {
                autoClose: 1000
            })
            setLoading(false)
            navigate('/admin/exam/danh-sach')
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error?.response?.data?.message, {
                autoClose: 1000
            })
        }
    }
    const handleUpdateExam = async (data) => {
        let payload = {
            title: data.title,
            startTime: data.startTime,
            endTime: data.endTime,
            date: data.date,
            numberOfQuestions: data.numberOfQuestions,
            createdBy: user._id,
        }
        try {
            await updateExam(data?._id, payload);
            toast.success('Cập nhật thành công', {
                autoClose: 1000
            })
            navigate('/admin/exam/danh-sach')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message, {
                autoClose: 1000
            })
        }
    }
    // question
    const handleCreateQuestion = async () => {
        console.log('submit')
        if (!question) {
            toast.warn('Câu hỏi không được để trống');
            return;
        }
        if (time === 0) {
            toast.warn('Thời gian làm bài không được để trống');
            return
        }
        if (time < 0) {
            toast.warn('Thời gian làm bài không được nhỏ hơn 0');
        }
        // check value of options
        const filledOptions = options.filter(option => option.option !== '');
        if (filledOptions.length < 2) {
            toast.warn('Phải nhập tối thiểu 2 đáp án');
            return;
        }
        const answer = options.filter(option => option.isAnswer);
        if (answer.length === 0) {
            toast.warn('Chưa có đáp án đúng');
            return;
        }
        let payload = {
            question,
            options: filledOptions,
            time
        }
        console.log(payload)
        try {
            setLoading(true)
            const res = await createQuestion(payload);
            toast.success('Thêm câu hỏi thành công', {
                autoClose: 1000
            });
            setLoading(false)
            navigate('/admin/question/danh-sach')
        } catch (e) {
            setLoading(false)
            toast.error(e?.response?.data?.message, {
                autoClose: 1000
            });
        }
    }
    const handleUpdateQuestion = async () => {
        if (!question) {
            toast.warn('Câu hỏi không được để trống');
            return;
        }
        // check value of options
        const filledOptions = options.filter(option => option.option !== '');
        if (filledOptions.length < 2) {
            toast.warn('Phải nhập tối thiểu 2 đáp án');
            return;
        }
        const answer = options.filter(option => option.isAnswer);
        if (answer.length === 0) {
            toast.warn('Chưa có đáp án đúng');
            return;
        }
        let payload = {
            question,
            options: filledOptions,
            time
        }
        try {
            setLoading(true)
            const res = await updateQuestion(_data?._id, payload);
            toast.success('Cập nhật thành công', {
                autoClose: 1000
            });
            setLoading(false)
            navigate('/admin/question/danh-sach')

        } catch (e) {
            setLoading(false)
            toast.error(e?.response?.data?.message, {
                autoClose: 1000
            });
        }
    }
    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'exam') {
            if (isEdit)
                await handleUpdateExam(data);
            else
                await handleCreateExam(data)
        }
        if (type === 'question') {
            if (isEdit) {
                await handleUpdateQuestion()
            } else {
                await handleCreateQuestion()
            }
        }
    };
    return (
        <div className="add">
            <div className="_modal">
                <h1>Thêm mới {type}</h1>
                {
                    type !== 'question' && (
                        <form onSubmit={handleSubmit}>
                            {
                                (isEdit && type === 'user' ? columns.filter(column => column.field !== 'password') : columns)
                                    .map((column) => (
                                        <div className="item">
                                            <label>{column.headerName}</label>
                                            <input type={column.type} placeholder={column.headerName}
                                                   name={column.field}
                                                   required={column.required}
                                                   value={data[column?.field]}
                                                   onChange={handleChange}
                                            />
                                        </div>
                                    ))
                            }
                            <div className='col-12'>
                                {loading ? <Loading/> :
                                    <button className='btn btn-success'>{isEdit ? 'Cập nhật' : 'Thêm mới'} </button>
                                }
                            </div>

                        </form>
                    )
                }
                {
                    type === 'question' && (
                        <form className='form_question' action="" onSubmit={handleSubmit}>
                            <div className='row mb-3 w-100'>
                                <div className='col-12'>
                                    <h2 className=''>Câu hỏi
                                    </h2>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={question}
                                        required
                                        onReady={editor => {
                                            console.log('Editor đã sẵn sàng!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            setQuestion(editor.getData())
                                        }}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor={'form-time'} className='form-label fs-3'>Thời gian làm bài
                                        (Giây)</label>
                                    <input id='form-time'
                                           min={0}
                                           required
                                           value={time}
                                           onChange={(e) => setTime(e.target.value)}
                                           className='form-control' type="number"/>
                                </div>

                            </div>
                            <div className='row g-3'>
                                {options.map((option, index) => (
                                    <div className='col-6' key={index}>
                                        <span className='fs-3'>Đáp án {index + 1}</span>
                                        <div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="radio"
                                                       value={option.isAnswer}
                                                       name={"isAnswer"}
                                                       id={`isAnswer${index}`}
                                                       checked={option.isAnswer}
                                                       onChange={(e) => {
                                                           setOptions(prevOptions => {
                                                               return prevOptions.map((option, optionIndex) => {
                                                                   if (optionIndex === index) {
                                                                       // This is the selected option, set isAnswer based on the checkbox
                                                                       return {
                                                                           ...option,
                                                                           isAnswer: e.target.checked
                                                                       };
                                                                   } else {
                                                                       // This is not the selected option, set isAnswer to false
                                                                       return {...option, isAnswer: false};
                                                                   }
                                                               });
                                                           });
                                                       }}/>
                                                <label htmlFor={`isAnswer${index}`}
                                                       className="form-check-label">Đáp
                                                    án
                                                    đúng</label>

                                            </div>
                                        </div>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={option.option}
                                            onChange={(event, editor) => {
                                                handleChangeOptions(index, editor)
                                            }}
                                        />
                                    </div>
                                ))}

                            </div>
                            <div className='row w-100'>
                                <div className='col-12 text-center my-5'>
                                    {loading ? <Loading/> :
                                        <button type={"submit"} className='btn btn-success text-center'>
                                            {isEdit ? 'Cập nhật' : 'Thêm mới'}
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>

                    )
                }

            </div>
            <ToastContainer/>
        </div>
    );
};

export default Form;
