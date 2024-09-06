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
    const [time, setTime] = useState(localStorage.getItem('time') || 0)
    const [initTime, setInitTime] = useState(0)
    const [answerId, setAnswerId] = useState('')
    const [totalQuestion, setTotalQuestion] = useState(0)
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
            setTotalQuestion(countQuestion?.data)
            const checkUser = await checkUserExit(payloadUser)
            if (checkUser?.data) {
                toast('Bạn đã trả lời câu hỏi này', {
                    autoClose: 500
                })
                // localStorage.removeItem('time')
                if (index >= totalQuestion) {
                    navigate(`/bang-xep-hang-all/${id}`)
                    return;
                }
                navigate(`/thi/${id}?index=${encrypt(Number(index) + 1)}`)
                // return;
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
                handleSubmit()
            }
        }, 1000)

        return () => {
            clearInterval(countdown)
        }

    }, [time, index])
    const handleOnchange = (e) => {
        setAnswerId(e.target.value)
    }
    const handleSubmit = async () => {
        if (Number(index) <= 5) {
            try {
                if (user.role === 'admin') {
                    localStorage.removeItem('time')
                    if (Number(index) >= Number(totalQuestion)) {
                        navigate(`/bang-xep-hang-all/${id}`)
                        return;
                    }
                    navigate(`/bang-xep-hang/${id}?index=${encrypt(index)}&questionId=${encrypt(question?._id)}`)
                    return
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
                toast.success('Nộp bài thành công', {
                    autoClose: 500
                })
                localStorage.removeItem('time')
                setAnswerId('')
                if (Number(index) >= Number(totalQuestion)) {
                    navigate(`/bang-xep-hang-all/${id}`)
                    return
                }
                navigate(`/bang-xep-hang/${id}?index=${encrypt(index)}&questionId=${encrypt(question?._id)}`)
            } catch (error) {
                toast.error('Đã có lỗi xảy ra', {
                    autoClose: 1000
                })
                console.log(error)
            }
        } else {
            try {
                if (user.role === 'admin') {
                    localStorage.removeItem('time')
                    if (Number(index) >= Number(totalQuestion)) {
                        navigate(`/bang-xep-hang-all/${id}`)
                        return
                    }
                    navigate(`/thi/${id}?index=${encrypt((parseInt(index) + 1).toString())}`)
                    return
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
                toast.success('Nộp bài thành công', {
                    autoClose: 500
                })
                localStorage.removeItem('time')
                setAnswerId('')
                if (Number(index) >= Number(totalQuestion)) {
                    console.log(index + 1)
                    navigate(`/bang-xep-hang-all/${id}`)
                    return
                }
                navigate(`/thi/${id}?index=${encrypt((parseInt(index) + 1).toString())}`)
            } catch (error) {
                toast.error('Đã có lỗi xảy ra', {
                    autoClose: 1000
                })
                console.log(error)
            }
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
                                    <div key={index} className='col-md-6 d-flex align-items-center'>
                                        <label className={answerId === item?._id ? 'item active' : 'item'}>
                                            <div className='d-flex align-items-center left'>
                                                <div>{answer[index]}</div>
                                                <div dangerouslySetInnerHTML={{__html: item?.option}}/>
                                            </div>
                                            <div>
                                                <input type="radio" hidden onChange={handleOnchange} name='answer'
                                                       checked={answerId === item?._id}
                                                       value={item?._id}/>
                                            </div>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='food mb-3'>
                    <div className='row'>
                        <div className='col-md-12 text-end'>
                            <button onClick={handleSubmit}>
                                Nộp bài
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Exam;