import './exam.scss'
import Header from "../../../components/header/Header.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {decrypt, encrypt} from "../../../utils/crypto.js";
import {toast} from "react-toastify";
import {checkUserExit, createExamUser} from "../../../apis/examUser.js";
import {checkCountQuestion, getQuestionByIndex} from "../../../apis/exam.js";
import LoadingText from "../../../components/loading/loadingText/Loading.jsx";
import LoadingPage from "../../../components/loading/loadingSpin/Loading.jsx";
import {useSelector} from "react-redux";

const answer = ['A', 'B', 'C', 'D']
const Exam = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params;
    const query = new URLSearchParams(window.location.search)
    const index = decrypt(query.get('index'))
    const [question, setQuestion] = useState({})
    let [time, setTime] = useState(10)
    const [answerId, setAnswerId] = useState('')
    const [startCountdown, setStartCountdown] = useState(false)
    let [startTime, setStartTime] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const fetchApi = async (id, index) => {
        try {
            setStartCountdown(false);
            setLoading(true)
            let payload = {
                id,
                index
            }
            const [res, countQuestion] = await Promise.all([
                getQuestionByIndex(payload),
                checkCountQuestion(id),
            ]);
            setQuestion(res?.data);
            localStorage.setItem('totalQuestion', countQuestion?.data);
            setTime(res?.data?.time);
            if (Number(index) > Number(countQuestion?.data)) {
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(countQuestion?.data)}`);
                return;
            }
            let payloadUser = {
                userId: user?._id,
                examId: id,
                questionId: res.data?._id
            }
            const checkUser = await checkUserExit(payloadUser)

            if (checkUser?.data) {
                toast('Bạn đã trả lời câu hỏi này', {
                    autoClose: 500
                });
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`);
            }
            setStartTime(Date.now());
            setStartCountdown(true);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            setStartCountdown(false);
            toast('Đã có lỗi xảy ra', {
                autoClose: 1000
            });
            console.log(error);
        }
    }
    useEffect(() => {
        fetchApi(id, index)
    }, [index])
    useEffect(() => {
        if (startCountdown) {
            let countdown = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        setTime(0)
                        clearInterval(countdown);
                        toast('Hết giờ', {
                            autoClose: 1000
                        });
                        handleSubmit('');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => {
                clearInterval(countdown);
            };
        }
    }, [startCountdown])
    const handleSubmit = async (answerId = '') => {
        try {
            //
            setLoadingSubmit(true)
            let endTime = Date.now();
            let timeAnswered = Math.floor(endTime - startTime);

            if (user.role === 'admin') {
                toast.success('Đã nộp bài', {
                    autoClose: 500
                })
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)
                return;
            }
            let payload = {
                examId: id,
                userId: user?._id,
                answers: {
                    question: question?._id,
                    answer: answerId,
                    timeAnswered,
                }
            }
            console.log(payload)
            await createExamUser(payload)
            toast.success('Đã nộp bài', {
                autoClose: 500
            })
            setAnswerId('')
            navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)
            setLoadingSubmit(false)
        } catch (error) {
            setLoadingSubmit(false)
            toast.error('Đã có lỗi xảy ra', {
                autoClose: 1000
            })
            console.log(error)
        }
    }
    return (
        <div className='exam'>
            <Header/>
            {
                loadingSubmit && <div className='loading'>
                    <LoadingPage/>
                </div>
            }
            {
                loading ?
                    <div className='pt-5'>
                        <LoadingText/>
                    </div> :
                    <>
                        <div className='head__mb container d-flex d-md-none'>
                            <div className='cau'>Câu {index}</div>
                            <div className='content'>
                                <div className='text'>Thời gian trả lời</div>
                                <div className='time'>{time}s</div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='head mt-5'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='left d-flex align-items-center'>
                                            <div className='d-none d-md-block'>
                                                Câu {index}
                                            </div>
                                            <div dangerouslySetInnerHTML={{__html: question?.question}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6 d-none d-md-block'>
                                        <div className='right d-flex'>
                                            <div>
                                                Thời gian còn lại
                                            </div>
                                            <div>
                                                {time}s
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='body pb-5'>
                                <div className='row g-3'>
                                    {
                                        question?.options && question?.options?.map((item, index) => {
                                            return (
                                                <div onClick={() => handleSubmit(item?._id, time)} key={index}
                                                     className='col-md-6 d-flex align-items-center'>
                                                    <label
                                                        onClick={() => setAnswerId(item?._id)}
                                                        className={answerId === item?._id ? 'item active' : 'item'}>
                                                        <div className='d-flex align-items-center left'>
                                                            <div>{answer[index]}</div>
                                                            <div dangerouslySetInnerHTML={{__html: item?.option}}/>
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}
export default Exam;