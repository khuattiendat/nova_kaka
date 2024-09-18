import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header.jsx";
import './listExam.scss';
import { getExamComing, updateMemberExam } from "../../../apis/exam.js";
import { toast } from "react-toastify";
import LoadingText from "../../../components/loading/loadingText/Loading.jsx";
import LoadingPage from "../../../components/loading/loadingSpin/Loading.jsx";

const ListExam = React.memo(() => {
    const navigate = useNavigate();
    const [listExam, setListExam] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [loading, setLoading] = useState(false);
    const [loadingJoin, setLoadingJoin] = useState(false);


    const fetchApi = async () => {
        try {
            setLoading(true);
            const res = await getExamComing();
            setListExam(res.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    useEffect(() => {
        console.log('useEffect');

        fetchApi();
    }, []);

    const handleClick = async (id) => {
        try {
            setLoadingJoin(true);
            let payload = {
                userId: user._id,
                examId: id
            };
            await updateMemberExam(payload);
            toast('Chúc mừng bạn đã tham gia NovaQuiz', {
                autoClose: 500,
            });
            navigate(`/phong-cho/${id}`);
            setLoadingJoin(false);
        } catch (e) {
            setLoadingJoin(false);
            console.log(e);
        }
    };

    return (
        <div className='list-exam'>
            {loadingJoin && <div className='loading'><LoadingPage /></div>}
            <Header />
            <div className='d-block d-sm-none'>
                <div className='head__mb'>
                    <img src="/image/Rectangle%201.png" alt="" />
                </div>
            </div>
            <div className='container'>
                {loading ? '' :
                    listExam.length > 0 ?
                        (<h2 className='title fs-6 text-center'>Cuộc thi đang diễn ra</h2>) :
                        <h2 className='title fs-6 text-center'>Rất tiếc, cuộc thi đang diễn ra. Hẹn gặp bạn ở NovaQuiz sắp tới nhé !</h2>
                }
                <div className='row g-3'>
                    {loading ? <div className='mt-5'><LoadingText /></div> :
                        listExam.length > 0 ? listExam.map((item, index) => (
                            <div className='col-md-6 col-12 ' key={index}>
                                <div className='exam-item p-md-3 p-2'>
                                    <span className='fs-3'>{item.title}</span>
                                    <button className='fs-6 p-2 p-md-3' onClick={() => handleClick(item?._id)}>Tham gia</button>
                                </div>
                            </div>
                        )) : (
                            <div className='d-flex w-100 justify-content-center image'>
                                <img className='w-25' src="/image/pngegg.png" alt="" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
});

export default ListExam;