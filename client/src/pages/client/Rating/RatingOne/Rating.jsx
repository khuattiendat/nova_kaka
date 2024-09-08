import Header from "../../../../components/header/Header.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {decrypt, encrypt} from "../../../../utils/crypto.js";
import './rating.scss'
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import button from "bootstrap/js/src/button.js";

const answer = ['A', 'B', 'C', 'D']
const Rating = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [socket, setSocket] = useState(null)
    const params = useParams()
    const {id} = params
    const query = new URLSearchParams(window.location.search)
    const index = decrypt(query.get('index'))
    const questionId = decrypt(query.get('questionId'))
    const [rating, setRating] = useState([])
    const [optionAnswer, setOptionAnswer] = useState('')
    const [totalQuestion, setTotalQuestion] = useState(0)
    const navigate = useNavigate()
    const [viewAnswer, setViewAnswer] = useState(false)
    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_SERVER_URL)
        setSocket(socketConnection)
        return () => {
            socketConnection.disconnect()
        }
    }, [])
    useEffect(() => {
        if (socket) {
            socket.emit('get-rating', {
                examId: id,
                questionId: questionId
            })
            socket.on('get-rating', (data) => {
                console.log(data)
                setRating(data)

                let correctAnswerIndex = data[0]?.answers[index - 1]?.question?.options?.findIndex(item => {
                    return item.isAnswer === true;
                });
                setOptionAnswer({
                    option: data[0]?.answers[index - 1]?.question?.options[correctAnswerIndex]?.option,
                    index: correctAnswerIndex
                });
            })
            socket.on('next-question', (data) => {
                console.log(data)
                const {index} = data
                if (index) {
                    navigate(`/thi/${id}?index=${encrypt((parseInt(index) + 1).toString())}`)
                }
            })
            socket.on('view-answer', (data) => {
                setViewAnswer(data.view)
            })
        }
    }, [socket])
    const handleNext = () => {
        console.log('next')
        // socket.emit('next-question', {
        //     index: index
        // })
    }
    const handleViewAnswer = () => {
        socket.emit('view-answer', {
            view: viewAnswer
        })
    }
    return (
        <div className='rating'>
            <Header/>
            <div className='d-block d-sm-none'>
                <div className='head__mb'>
                    <div className='text'>Câu {index}</div>
                </div>
            </div>
            <div className='container'>
                <div className='head mt-5'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='left d-flex align-items-center d-none d-md-block'>
                                <div>
                                    Câu {index}
                                </div>
                                <div dangerouslySetInnerHTML={{__html: rating[0]?.answers?.question?.question}}>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 d-flex justify-content-end justify-content-center'>
                            {
                                (user && user.role === 'admin' && (
                                    <>
                                        <button className='btn btn-success fs-6 px-2 px-md-4 fw-normal'
                                                onClick={handleViewAnswer}>Xem đáp án
                                        </button>
                                        <button onClick={handleNext}
                                                className='btn btn-primary fs-6 px-2 px-md-4 fw-normal ms-5'>Câu
                                            tiếp theo
                                        </button>
                                    </>

                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='answer d-block d-md-flex'>
                    <span className='title d-block'>Câu trả lời đúng</span>
                    {
                        viewAnswer && optionAnswer.option ? (
                            <div className='content  ms-0 ms-md-5'>
                                <span>{answer[optionAnswer.index]}</span>
                                <span dangerouslySetInnerHTML={{__html: optionAnswer.option}}></span>
                            </div>
                        ) : (
                            <div className='content mt-3 mt-md-0 ms-0 ms-md-5'>
                                <span>Đang chờ kết quả</span>
                            </div>
                        )
                    }
                </div>
                <div className='body'>
                    <div className='head'>
                        Bảng xếp hạng
                    </div>
                    <div className='content w-100'>
                        <div className='row w-100 m-auto'>
                            <div className='col-md-3'></div>
                            <div className='col-md-6 col-12'>
                                <div className='row w-100 m-auto'>
                                    <div className='col-md-4 col-4 p-0'>
                                        <div className='item'>
                                            <span>{rating.length > 1 && rating[1]?.user?.name}</span>
                                            <div className='number-2'>2</div>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-4 p-0'>
                                        <div className='item'>
                                            <span>{rating.length > 0 && rating[0]?.user?.name}</span>
                                            <div className='number-1'>1</div>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-4 p-0'>
                                        <div className='item'>
                                            <span>{rating.length > 2 && rating[2]?.user?.name}</span>
                                            <div className='number-3'>3</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-3'></div>
                        </div>
                    </div>
                    <div className='food w-100 mb-3'>
                        <table className="table table-custom">
                            <tbody>
                            {
                                rating.length > 0 && rating.slice(3).map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-muted">{index + 4}</td>
                                        <td>{item.user.name}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        rating.length <= 0 && (
                            <div className='text-center mb-5'>
                                <span>chưa có người trả lời đúng</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Rating;