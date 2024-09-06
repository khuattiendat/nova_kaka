import Header from "../../../../components/header/Header.jsx";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useNavigate, useParams} from "react-router-dom";
import './Rating.scss'
import button from "bootstrap/js/src/button.js";
import {decrypt, encrypt} from "../../../../utils/crypto.js";
import {toast} from "react-toastify";

const Rating = () => {
    const [socket, setSocket] = useState(null)
    const params = useParams()
    const {id} = params;
    const query = new URLSearchParams(window.location.search)
    const index = decrypt(query.get('index'))
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [rating, setRating] = useState([])
    const navigate = useNavigate();
    const totalQuestion = localStorage.getItem('totalQuestion') || 1;
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        const socketConnection = io(process.env.REACT_APP_SERVER_URL)
        setSocket(socketConnection)
        return () => {
            socketConnection.disconnect()
        }
    }, [])
    useEffect(() => {
        if (socket) {
            socket.emit('rating', {
                examId: id,
            })
            socket.on('rating', (data) => {
                console.log(data)
                setRating(data)
            })
            socket.on('next-question', () => {
                navigate(`/thi/${id}?index=${encrypt((parseInt(index) + 1).toString())}`)
            })
        }
    }, [socket]);
    const handleNext = () => {
        if (Number(index) === Number(totalQuestion)) {
            toast.warn('Đây là câu cuối cùng', {
                autoClose: 1000
            })
            return;
        }
        socket.emit('next-question')
    }
    return (
        <div className='rating__all'>
            <Header/>
            <div className='head__mb d-flex d-md-none'>
                <h2>
                    Chúc mừng bạn hoàn thành bài thi
                </h2>
            </div>
            <div className='d-flex d-md-none text__content'>
                <span>
                Bảng xếp hạng
                </span>
            </div>
            <div className='head mt-5 container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='left align-items-center d-md-flex justify-content-center'>
                            <div className='cau'>
                                Câu {index}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 d-flex justify-content-end justify-content-center'>
                        {
                            user && user.role === 'admin' && (
                                <>
                                    <button onClick={handleNext}
                                            className='btn btn-primary fs-6 px-2 px-md-4 fw-normal ms-5'>Câu
                                        tiếp theo
                                    </button>
                                </>

                            )
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='title d-none d-md-flex justify-content-center'>
                    <h2>
                        Chúc mừng bạn hoàn thành bài thi
                    </h2>
                </div>
                <div className='body'>
                    <div className='content w-100'>
                        <div className='row w-100 m-auto'>
                            <div className='col-md-3 col-0'></div>
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
                                    <div className='col-md-4 col-4   p-0'>
                                        <div className='item'>
                                            <span>{rating.length > 2 && rating[2]?.user?.name}</span>
                                            <div className='number-3'>3</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-3 col-0'></div>
                        </div>
                    </div>
                    <div className='food w-100 mt-3'>
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
                </div>

            </div>
        </div>
    )
}
export default Rating;