import React, {useEffect, useState} from "react";
import './random.scss'
import ModalRandom from "../../../components/modal/ModalRandom/ModalRandom.jsx";
import Confetti from 'react-confetti';
import {useNavigate, useParams} from "react-router-dom";
import {getMemberExam} from "../../../apis/exam.js";
import {toast} from "react-toastify";
import * as XLSX from "xlsx";
import {useSelector} from "react-redux";

function Random() {
    const user = useSelector(state => state.user);
    const [listUser, setListUser] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;
    const [randomUser, setRandomUser] = useState({
        phone: '',
        name: ''
    });
    const [isAnimating, setIsAnimating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const fetchApi = async () => {
        try {
            const res = await getMemberExam(id);
            setListUser(res.data);
        } catch (err) {
            toast.error('Đã có lỗi xảy ra', {
                autoClose: 1000,
            });
            console.log(err);
        }
    }
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
        fetchApi();
    }, []);
    // Hàm để chọn ngẫu nhiên một user với hiệu ứng đẹp hơn
    const pickRandomUser = () => {
        if (listUser.length <= 1) {
            toast.error('Chưa có người tham gia', {
                autoClose: 1000,
            });
            return;
        }
        const users = listUser?.filter(user => user.role !== 'admin')
            .map(user => {
                return {name: user.name, phone: user.phone}
            });
        if (isAnimating) return; // Ngăn không cho chạy animation nhiều lần cùng lúc

        setIsAnimating(true);
        let iterations = 50; // Số lần thay đổi user trước khi dừng (tăng số lần để animation mượt hơn)
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * users.length);
            setRandomUser(users[randomIndex]);
            iterations--;

            if (iterations <= 0) {
                clearInterval(interval);
                // Sau khi hoàn thành, chọn user cuối cùng
                const finalIndex = Math.floor(Math.random() * users.length);
                setRandomUser(users[finalIndex]);
                setIsAnimating(false);
                setShow(true);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                }, 10000);
            }
        }, 100); // Thời gian mỗi lần thay đổi user (100ms)
    };


    return (
        <div className="random">
            <div className='container random__container'>
                <div className='img'>
                    <img src="/image/Rectangle%201.png" alt=""/>
                </div>
                <h2 className='title'>
                    Bốc thăm trúng thưởng
                </h2>
                <button onClick={pickRandomUser} className='btn btn-success fw-semibold fs-5 mt-3'
                        disabled={isAnimating}>Chọn ngẫu nhiên
                </button>
                <div className="result">{randomUser?.phone}</div>
            </div>
            {showConfetti && (
                <Confetti
                    style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999}}
                    numberOfPieces={500}
                />
            )}
            <ModalRandom show={show} handleClose={handleClose} data={randomUser}/>
        </div>
    );
}

export default Random;
