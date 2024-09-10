import Header from "../../../../components/header/Header.jsx";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useNavigate, useParams} from "react-router-dom";
import './Rating.scss'
import button from "bootstrap/js/src/button.js";
import {decrypt, encrypt} from "../../../../utils/crypto.js";
import Confetti from 'react-confetti';
import {motion, AnimatePresence} from 'framer-motion';
import * as XLSX from "xlsx";


const Rating = () => {
    const [socket, setSocket] = useState(null)
    const [showConfetti, setShowConfetti] = useState(false);
    const params = useParams()
    const {id} = params;
    const query = new URLSearchParams(window.location.search)
    const index = decrypt(query.get('index'));
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
                examId: id
            })
            socket.on('rating', (data) => {
                console.log(data)
                setRating(data?.rating)
            })
            socket.on('next-question', (data) => {
                const {index} = data
                let _index = Number(index) + 1
                navigate(`/thi/${id}?index=${encrypt(_index.toString())}`)
            })
        }
    }, [socket]);
    useEffect(() => {
        localStorage.removeItem('time')
        setShowConfetti(true)
        setTimeout(() => {
            setShowConfetti(false)
        }, 5000)
    }, [])
    const handleNext = () => {
        if (socket) {
            socket.emit('next-question', {
                index: index
            })
        }
    }
    const handleDownloadData = () => {
        const worksheet = XLSX.utils.json_to_sheet(rating.map(item => ({
            Name: item.user.name,
            Score: item.totalScore
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ratings');
        XLSX.writeFile(workbook, 'ratings.xlsx');
    }
    return (
        <div className='rating__all'>
            {showConfetti && <Confetti
                numberOfPieces={500}
            />}
            <Header/>
            <div className='head__mb d-flex d-md-none'>
                {
                    Number(index) === Number(totalQuestion) ? (
                            <h2>
                                Chúc mừng bạn đã hoàn thành bài thi
                            </h2>)
                        : (
                            <img src="/image/Rectangle%201.png" alt=""/>
                        )
                }
            </div>
            <div className='d-flex d-md-none text__content'>
                <span>
                Bảng xếp hạng
                </span>
            </div>
            <div className='head mt-5 container'>
                {
                    Number(index) === Number(totalQuestion) && (
                        <div className='d-none d-md-flex chucmung mb-5 justify-content-center'>
                            <h2>
                                Chúc mừng bạn đã hoàn thành bài thi
                            </h2>
                        </div>
                    )
                }

                <div className='row'>
                    <div className='col-6'>
                        <div className='left align-items-center d-md-flex justify-content-center'>
                            <div className={Number(index) === Number(totalQuestion) ? 'd-none' : 'cau'}>
                                Câu {index}
                            </div>
                        </div>
                    </div>
                    <div className='col-6 d-flex justify-content-end justify-content-center'>
                        {
                            user && user.role === 'admin' && (
                                <>
                                    {
                                        Number(index) === Number(totalQuestion) ?

                                            <button onClick={handleDownloadData}
                                                    className='btn btn-primary btn-quay'>
                                                Quay thưởng
                                            </button> :
                                            <button onClick={handleNext}
                                                    className='btn btn-primary fs-6 px-2 px-md-4 fw-normal ms-0 ms-md-5'>
                                                Câu tiếp theo
                                            </button>
                                    }
                                </>

                            )
                        }
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='body'>
                    {
                        Number(index) === Number(totalQuestion) && (
                            <div className='content w-100'>
                                <div className='row w-100 m-auto'>
                                    <div className='col-md-2'></div>
                                    <div className='col-md-8 col-12'>
                                        <div className='row w-100 m-auto'>
                                            <div className='col-md-4 col-4 p-0'>
                                                <motion.div
                                                    className='item'
                                                >
                                                    <motion.span
                                                        className='number-2'
                                                        initial={{opacity: 0, scale: 0.8}}
                                                        animate={{opacity: 1, scale: 1}}
                                                        exit={{opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <img src="/image/pngegg_2.png" alt=""/>
                                                    </motion.span>
                                                    <motion.div
                                                        className='number-2'
                                                        initial={{height: 0, opacity: 0, scale: 0.8}}
                                                        animate={{height: '75%', opacity: 1, scale: 1}}
                                                        exit={{height: 0, opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <span>
                                                            <span className='fw-semibold'>
                                                              {rating?.length > 0 && rating[1]?.user?.name}
                                                            </span>
                                                            <span className='d-block'>
                                                                {rating?.length > 0 && rating[1]?.totalScore}
                                                            </span>
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <div className='col-md-4 col-4 p-0'>
                                                <motion.div
                                                    className='item'
                                                >
                                                    <motion.span
                                                        className='number-1'
                                                        initial={{opacity: 0, scale: 0.8}}
                                                        animate={{opacity: 1, scale: 1}}
                                                        exit={{opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <img src="/image/pngegg_1.png" alt=""/>
                                                    </motion.span>
                                                    <motion.div
                                                        className='number-1'
                                                        initial={{height: 0, opacity: 0, scale: 0.8}}
                                                        animate={{height: '100%', opacity: 1, scale: 1}}
                                                        exit={{height: 0, opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <span>
                                                            <span className='fw-semibold d-block'>
                                                              {rating?.length > 0 && rating[0]?.user?.name}
                                                            </span>
                                                            <span className='d-block'>
                                                                {rating?.length > 0 && rating[0]?.totalScore}</span>
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <div className='col-md-4 col-4 p-0'>
                                                <motion.div
                                                    className='item'
                                                >
                                                    <motion.span
                                                        className='number-3'
                                                        initial={{opacity: 0, scale: 0.8}}
                                                        animate={{opacity: 1, scale: 1}}
                                                        exit={{opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <img src="/image/pngegg_3.png" alt=""/>

                                                    </motion.span>
                                                    <motion.div
                                                        className='number-3'
                                                        initial={{height: 0, opacity: 0, scale: 0.8}}
                                                        animate={{height: '40%', opacity: 1, scale: 1}}
                                                        exit={{height: 0, opacity: 0, scale: 0.8}}
                                                        transition={{duration: 0.5, ease: "easeOut"}}
                                                    >
                                                        <span className='text'>
                                                            <span>
                                                              {rating?.length > 0 && rating[2]?.user?.name}
                                                            </span>
                                                            <span
                                                                className='d-block'>{rating?.length > 0 && rating[2]?.totalScore}</span>
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-2'></div>
                                </div>
                            </div>
                        )
                    }

                    <div className='food w-100 mt-3'>
                        <table className="table table-custom">
                            <tbody>
                            {
                                rating?.length > 0 ? (
                                    <AnimatePresence>
                                        {Number(index) === Number(totalQuestion) ? rating?.slice(3).map((item, index) => (
                                            <motion.tr
                                                key={item.user._id}
                                                className='mt-5'
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 20}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                            >
                                                <td className="text-muted">{index + 4}</td>
                                                <td>
                                                    {item?.user?.name} - Điểm: {item?.totalScore}
                                                </td>
                                            </motion.tr>
                                        )) : rating?.map((item, index) => (
                                            <motion.tr
                                                key={item?.user?._id}
                                                className={index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 20}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                            >
                                                <td className="text-muted">{index + 1}</td>
                                                <td>{item?.user?.name} - Điểm: {item?.totalScore}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                ) : (
                                    <tr>
                                        <td colSpan={2} className='text-center'>Đang chờ kết quả</td>
                                    </tr>
                                )
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