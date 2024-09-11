import "./home.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const HomeAdmin = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('Bạn không có quyền truy cập', {
                autoClose: 1000,
            })
            navigate('/admin/login')
        }
    }, [])
    return (
        <div className="home">
            <h1 className='text-center w-100 mt-3 fw-semibold'>Trang chủ</h1>
            {/*<div className="box box1">*/}
            {/*    <TopBox data={topUsers}/>*/}
            {/*</div>*/}
            {/*<div className="box box2">*/}
            {/*    <ChartBox {...chartBoxUser} />*/}
            {/*</div>*/}
            {/*<div className="box box3">*/}
            {/*    <ChartBox {...chartBoxExam} />*/}
            {/*</div>*/}
            {/*<div className="box box4">*/}
            {/*    <PieChartBox/>*/}
            {/*</div>*/}
            {/*<div className="box box5">*/}
            {/*    <ChartBox {...chartBoxConversion} />*/}
            {/*</div>*/}
            {/*<div className="box box6">*/}
            {/*    <ChartBox {...chartBoxRevenue} />*/}
            {/*</div>*/}
            {/*<div className="box box7">*/}
            {/*    <BigChartBox/>*/}
            {/*</div>*/}
            {/*<div className="box box8">*/}
            {/*    <BarChartBox {...barChartBoxVisit} />*/}
            {/*</div>*/}
            {/*<div className="box box9">*/}
            {/*    <BarChartBox {...barChartBoxRevenue} />*/}
            {/*</div>*/}
        </div>
    );
};

export default HomeAdmin;
