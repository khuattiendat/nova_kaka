import './wait.scss';
import {useEffect, useState} from "react";
import Header from "../../../components/header/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {io} from "socket.io-client";
import {getExamById} from "../../../apis/exam.js";
import {toast} from "react-toastify";
import {showAlertConfirm} from "../../../utils/showAlert.js";
import {encrypt} from "../../../utils/crypto.js";

const Wait = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const index = encrypt('1');
    const [members, setMembers] = useState([])
    const [socket, setSocket] = useState(null)
    const [exam, setExam] = useState({})
    const [time, setTime] = useState({
        hour: 0,
        minute: 0,
        seconds: 0
    })
    const params = useParams()
    const {id} = params;
    const navigate = useNavigate();
    const fetchApi = async () => {
        try {
            const res = await getExamById(id);
            setExam(res.data)
        } catch (e) {
            console.log(e)
            toast.error(e?.response?.data?.message, {
                autoClose: 1000
            })
        }
    }
    // socket connection
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
    // call socket
    useEffect(() => {
        if (socket) {
            socket.emit('phong-cho', {
                examId: id,
            })
            socket.on('phong-cho', (data) => {
                setMembers(data)
            })
            socket.on('exam-started', () => {
                navigate(`/thi/${id}?index=${index}`)
            })
        }
    }, [socket])
    useEffect(() => {
        localStorage.removeItem('time')
        fetchApi()
        if (exam.startTime) {
            const [startHour, startMinute] = exam.startTime.split(':');
            const examStartDate = new Date();
            examStartDate.setHours(startHour, startMinute, 0);
            // Start the countdown timer
            const countdown = setInterval(() => {
                // Get the current time
                // Calculate the remaining time in seconds
                let currentTime = new Date();
                let remainingTimeInSeconds = (examStartDate.getTime() - currentTime.getTime());

                // Check if the exam has started
                if (remainingTimeInSeconds <= 0) {
                    clearInterval(countdown);
                    toast.warn('Cuộc thi sẽ sớm được bắt đầu', {
                        autoClose: 1000,
                    })
                } else {
                    // Convert the remaining time to hours, minutes, and seconds
                    let hour = Math.floor((remainingTimeInSeconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                    let minute = Math.floor((remainingTimeInSeconds % (60 * 60 * 1000)) / (60 * 1000));
                    let seconds = Math.floor((remainingTimeInSeconds % (60 * 1000)) / 1000);
                    setTime({
                        hour: hour,
                        minute: minute,
                        seconds: seconds
                    })

                }
            }, 1000); // Update every second

            // Clean up the countdown timer when the component unmounts
            return () => clearInterval(countdown);
        }

    }, [exam.startTime]);
    const handleStart = async () => {
        let confirm = await showAlertConfirm('Bạn có chắc chắn muốn bắt đầu cuộc thi?')
        if (confirm) {
            socket.emit('update-start-time', {
                examId: id
            })
        }
    }
    return (
        <div className='wait'>
            <Header/>
            <div className='d-block d-sm-none'>
                <div className='head__mb container'>
                    <div className='text'>Cuộc thi sẽ bắt đầu trong</div>
                    <div className='time'>{time.hour}:{time.minute}:{time.seconds}</div>
                </div>
            </div>
            <div className='container mt-3'>
                <div className='row'>
                    {
                        user?.role === 'admin' && (
                            <div className='col-12'>
                                <div className='text-center mb-3'>
                                    <button onClick={handleStart} className='btn btn-primary'>Bắt đầu ngay</button>
                                </div>
                            </div>
                        )
                    }
                    <div className='col-md-8 col-12'>
                        <div className='list__user left'>
                            <div className='row g-3'>
                                {
                                    members.length > 0 && members.map((item, index) => (
                                        <div className='col-md-2 col-3' key={index}>
                                            <div className='user__box'>
                                                <div className='user__avatar'>
                                                    <img src="/image/avt.png" alt=""/>
                                                </div>
                                                <div className='user__name'>{item?.name}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className='col-12 '>
                                    <span className='text-end d-block fw-bold fs-6'>
                                        Đang có {members.length} người trong phòng chờ...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-12'>
                        <div className='right'>
                            <div className='head d-none d-md-flex'>
                                <div className='text'>Cuộc thi sẽ bắt đầu trong</div>
                                <div className='time'>{time.hour}:{time.minute}:{time.seconds}</div>
                            </div>
                            <div className='thele'>
                                <div className='text'>Thể lệ</div>
                                <div className='content'>
                                    <p>1. Câu hỏi sẽ được</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Wait;