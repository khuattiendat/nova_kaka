import BarChartBox from "../../../components/barChartBox/BarChartBox.jsx";
import BigChartBox from "../../../components/bigChartBox/BigChartBox.jsx";
import ChartBox from "../../../components/chartBox/ChartBox.jsx";
import PieChartBox from "../../../components/pieCartBox/PieChartBox.jsx";
import TopBox from "../../../components/topBox/TopBox.jsx";
import {
    barChartBoxRevenue,
    barChartBoxVisit,
    chartBoxConversion,
    chartBoxExam,
    chartBoxRevenue,
    chartBoxUser,
} from "../../../utils/data/index.jsx";
import "./home.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const HomeAdmin = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [topUsers, setTopUsers] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('Bạn không có quyền truy cập', {
                autoClose: 1000,
            })
            console.log('user', user)
            navigate('/admin/login')
        }
    }, [])


    return (
        <div className="home">
            <div className="box box1">
                <TopBox data={topUsers}/>
            </div>
            <div className="box box2">
                <ChartBox {...chartBoxUser} />
            </div>
            <div className="box box3">
                <ChartBox {...chartBoxExam} />
            </div>
            <div className="box box4">
                <PieChartBox/>
            </div>
            <div className="box box5">
                <ChartBox {...chartBoxConversion} />
            </div>
            <div className="box box6">
                <ChartBox {...chartBoxRevenue} />
            </div>
            <div className="box box7">
                <BigChartBox/>
            </div>
            <div className="box box8">
                <BarChartBox {...barChartBoxVisit} />
            </div>
            <div className="box box9">
                <BarChartBox {...barChartBoxRevenue} />
            </div>
        </div>
    );
};

export default HomeAdmin;
