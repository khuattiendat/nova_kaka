import './wait.scss';
import {useEffect, useMemo, useState} from "react";
import Header from "../../../components/header/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getExamById} from "../../../apis/exam.js";
import {toast} from "react-toastify";
import {encrypt} from "../../../utils/crypto.js";
import {motion, AnimatePresence} from 'framer-motion';
import {useSelector} from "react-redux";
import {showAlertConfirm} from "../../../utils/showAlert.js";
import _ from "lodash";

const Wait = () => {
    // const user = useSelector(state => state.user);
    const user = JSON.parse(sessionStorage.getItem('user'))
    const socketConnection = useSelector(state => state.user.socketConnection);
    const index = encrypt('1');
    const [members, setMembers] = useState([]);
    const [exam, setExam] = useState({})
    const [startCountdown, setStartCountdown] = useState(false)
    const [time, setTime] = useState({
        hour: 0,
        minute: 0,
        seconds: 0
    })
    console.log('wait')
    const params = useParams()
    const {id} = params;
    const navigate = useNavigate();
    const debouncedNavigate = useMemo(() => _.debounce((path) => {
        navigate(path);
    }, 500), [navigate]);
    const fetchApi = async () => {
        try {
            setStartCountdown(false)
            const res = await getExamById(id);
            localStorage.setItem('totalQuestion', res?.data?.questions?.length);
            setExam(res.data)
            setStartCountdown(true);
        } catch (e) {
            setStartCountdown(false)
            console.log(e)
            toast.error(e?.response?.data?.message, {
                autoClose: 1000
            })
        }
    }
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('phong-cho', {
                examId: id,
            })
            socketConnection.on('phong-cho', (data) => {
                setMembers(data);
            })
            socketConnection.on('exam-started', () => {
                debouncedNavigate(`/thi/${id}?index=${index}`)
            })
        }
    }, [socketConnection])
    useEffect(() => {
        fetchApi()
    }, []);
    useEffect(() => {
        if (startCountdown) {
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
                    toast.warn('Cuộc thi đã bắt đầu', {
                        autoClose: 1000,
                    })
                    navigate(`/thi/${id}?index=${index}`)
                } else {
                    // Convert the remaining time to hours, minutes, and seconds
                    let hour = Math.floor((remainingTimeInSeconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                    let minute = Math.floor((remainingTimeInSeconds % (60 * 60 * 1000)) / (60 * 1000));
                    let seconds = Math.floor((remainingTimeInSeconds % (60 * 1000)) / 1000);
                    let formattedHour = String(hour).padStart(2, '0');
                    let formattedMinute = String(minute).padStart(2, '0');
                    let formattedSeconds = String(seconds).padStart(2, '0');
                    setTime({
                        hour: formattedHour,
                        minute: formattedMinute,
                        seconds: formattedSeconds
                    })

                }
            }, 1000); // Update every second

            // Clean up the countdown timer when the component unmounts
            return () => clearInterval(countdown);
        }
    }, [startCountdown])
    const handleStart = async () => {
        let confirm = await showAlertConfirm('Bạn có chắc chắn muốn bắt đầu cuộc thi?')
        if (confirm) {
            socketConnection.emit('update-start-time', {
                examId: id
            })
        }
    }
    return (
        <div className='wait'>
            <Header/>
            <div className='d-block d-sm-none'>
                <div className='head__mb container'>
                    <div className='text'>Thời gian còn lại để tham gia</div>
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
                    <div className='col-md-6 col-lg-8 col-12'>
                        <div className='list__user left'>
                            <div className='row h-100 g-3'>
                                {
                                    members?.length > 0 && (
                                        <div className='row h-100 g-3'>
                                            <AnimatePresence>
                                                {members.slice(0, 8).map((item, index) => (
                                                    <motion.div
                                                        className='col-md-3 col-lg-2 col-3'
                                                        key={item?.id || index}
                                                        initial={{opacity: 0, scale: 0.5}}
                                                        animate={{opacity: 1, scale: 1}}
                                                        exit={{opacity: 0, scale: 0.5}}
                                                        transition={{duration: 0.5}}
                                                    >
                                                        <div className='user__box'>
                                                            <div className='user__avatar'>
                                                                <img src="/image/avt.png" alt=""/>
                                                            </div>
                                                            <div className='user__name'>{item?.name}</div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                            <div className='col-12 d-flex justify-content-end'>
                                                <span>
                                                    {
                                                        members?.length > 8 && <b>{members?.length - 8} Người khác</b>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12 col-lg-4'>
                        <div className='right'>
                            <div className='head d-none d-md-flex'>
                                <div className='text'>Thời gian còn lại để tham gia</div>
                                <div className='time'>{time.hour}:{time.minute}:{time.seconds}</div>
                            </div>
                            <div className='thele'>
                                <div className='title'>Chúc mừng bạn đã tham gia NovaQuiz</div>
                                <div className='content'>
                                    <span className='f-6 fw-semibold'>
                                        - Bạn sẽ tham gia trả lời 10 câu hỏi, bạn hãy lựa chọn 1 đáp án đúng nhất trong thời gian 10 giây.
                                    </span>
                                    <span className='fs-6 fw-semibold'>
                                        - Bạn sẽ chiến thắng khi là người trả lời đúng và nhanh nhất
                                    </span>
                                </div>
                                <h3 className='mt-3 text-center'>
                                    Chúc bạn may mắn 🏆
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Wait;