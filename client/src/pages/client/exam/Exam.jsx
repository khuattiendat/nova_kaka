import './exam.scss'
import Header from "../../../components/header/Header.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {decrypt, encrypt} from "../../../utils/crypto.js";
import {toast} from "react-toastify";
import {checkUserExit, createExamUser} from "../../../apis/examUser.js";
import {checkCountQuestion, getQuestionByIndex} from "../../../apis/exam.js";

const answer = ['A', 'B', 'C', 'D']
const Exam = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const query = new URLSearchParams(window.location.search)
    const index = decrypt(query.get('index'))
    const [question, setQuestion] = useState({})
    const [time, setTime] = useState(localStorage.getItem('time') || 10)
    const [initTime, setInitTime] = useState(0)
    const [answerId, setAnswerId] = useState('')
    const fetchApi = async (id, index) => {
        try {
            let payload = {
                id,
                index
            }
            const res = await getQuestionByIndex(payload)
            const countQuestion = await checkCountQuestion(id)
            let payloadUser = {
                userId: user?._id,
                examId: id,
                questionId: res.data?._id
            }
            setQuestion(res?.data)
            setInitTime(res?.data?.time)
            localStorage.setItem('totalQuestion', countQuestion?.data)
            if (Number(index) > Number(countQuestion?.data)) {
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)
                return;
            }
            const checkUser = await checkUserExit(payloadUser)
            if (checkUser?.data) {
                toast('Bạn đã trả lời câu hỏi này', {
                    autoClose: 500
                })
                localStorage.removeItem('time')
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)
                return;
            }
            let time = localStorage.getItem('time')
            if (!time || isNaN(time)) {
                localStorage.setItem('time', Number(res.data?.time))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchApi(id, index)
    }, [index])
    // connect socket
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/')
    //     }
    //     const socketConnection = io(process.env.REACT_APP_SERVER_URL)
    //     setSocket(socketConnection)
    //     return () => {
    //         socketConnection.disconnect()
    //     }
    // }, [])
    // send socket
    // useEffect(() => {
    //
    //     if (socket) {
    //         socket.emit('exam', {
    //             id,
    //             index,
    //             userId: user?._id
    //         })
    //         socket.on('exam', (data) => {
    //             console.log(data)
    //             setQuestion(data.question)
    //             setInitTime(data.question?.time)
    //             setTotalQuestion(data.totalQuestion)
    //             if (Number(index) < Number(_index)) {
    //                 if (Number(_index) >= Number(totalQuestion)) {
    //                     navigate(`/bang-xep-hang-all/${id}`)
    //                     return
    //                 }
    //                 toast('Bạn đã trả lời câu hỏi này', {
    //                     autoClose: 500
    //                 })
    //                 navigate(`/thi/${id}?index=${encrypt(_index)}`)
    //                 return
    //             }
    //             let time = localStorage.getItem('time')
    //             if (!time || isNaN(time)) {
    //                 localStorage.setItem('time', Number(data?.question?.time))
    //             }
    //         })
    //     }
    // }, [socket, index])
    // countdown time
    useEffect(() => {
        let countdown = setInterval(() => {
            let time = localStorage.getItem('time')
            time = time - 1;
            setTime(time)
            localStorage.setItem('time', time)
            if (time <= 0) {
                setTime(0)
                localStorage.removeItem('time')
                clearInterval(countdown)
                toast('Hết giờ', {
                    autoClose: 1000
                })
                handleSubmit('')
            }
        }, 1000)
        return () => {
            clearInterval(countdown)
        }

    }, [time])
    const handleSubmit = async (answerId = '') => {
        try {
            if (user.role === 'admin') {
                localStorage.removeItem('time')
                toast.success('Đã nộp bài', {
                    autoClose: 500
                })
                navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)
                return;
            }
            let timeAnswered = initTime - time;
            let payload = {
                examId: id,
                userId: user?._id,
                answers: {
                    question: question?._id,
                    answer: answerId,
                    timeAnswered
                }
            }

            await createExamUser(payload)
            toast.success('Đã nộp bài', {
                autoClose: 500
            })
            localStorage.removeItem('time')
            setAnswerId('')
            navigate(`/bang-xep-hang-all/${id}?index=${encrypt(index)}`)

        } catch (error) {
            toast.error('Đã có lỗi xảy ra', {
                autoClose: 1000
            })
            console.log(error)
        }
    }
    return (
        <div className='exam'>
            <Header/>
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
                <div className='body'>
                    <div className='row g-3'>
                        {
                            question?.options && question?.options?.map((item, index) => {
                                return (
                                    <div onClick={() => handleSubmit(item?._id)} key={index}
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
        </div>
    )
}
export default Exam;