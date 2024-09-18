import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/admin/login/Login.jsx";
import "./styles/global.scss";
import './styles/responsive.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from "./pages/admin/newUser/NewUser.jsx";
import HomeClient from "./pages/client/HomeCLient/HomeClient.jsx";
import List from "./pages/admin/list/List.jsx";
import React from "react";
import RatingAll from "./pages/client/Rating/RatingAll/Rating.jsx";
import Test from "./pages/client/Test/Test.jsx";
import Wait from "./pages/client/wait/Wait.jsx";
import ListExam from "./pages/client/listExam/ListExam.jsx";
import Exam from "./pages/client/exam/Exam.jsx";
import Random from "./pages/client/Random/Random.jsx";
import LayoutClient from "./pages/layout/LayoutClient/LayoutClient.jsx";
import LayoutAdmin from "./pages/layout/LayoutAdmin/LayoutAdmin.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <LayoutAdmin/>,
            children: [
                {path: "/admin", element: <HomeAdmin/>},
                {path: "/admin/user/danh-sach", element: <List type='user'/>},
                {path: "/admin/user/them-moi", element: <NewUser type='user'/>},
                {path: "/admin/user/sua/:id", element: <NewUser type='user' isEdit={true}/>},
                {path: "/admin/exam/danh-sach", element: <List type='exam'/>},
                {path: "/admin/exam/them-moi", element: <NewUser type='exam'/>},
                {path: "/admin/exam/sua/:id", element: <NewUser type='exam' isEdit={true}/>},
                {path: "/admin/question/danh-sach", element: <List type='question'/>},
                {path: "/admin/question/them-moi", element: <NewUser type='question'/>},
                {path: "/admin/question/sua/:id", element: <NewUser type='question' isEdit={true}/>},
                {path: "/admin/data/:id", element: <List type='data'/>},
            ],
        },
        {
            path: '/',
            element: <LayoutClient/>,
            children: [
                {path: '/', element: <ListExam/>},
                {path: '/quay-thuong/:id', element: <Random/>},
                {path: '/phong-cho/:id', element: <Wait/>},
                {path: '/bang-xep-hang-all/:id', element: <RatingAll/>},
                {path: '/thi/:id', element: <Exam/>},
                {path: '/bai-thi-cua-ban', element: <Test/>}
            ]
        },
        {path: "/login", element: <HomeClient/>},
        {path: "/admin/login", element: <Login/>},
    ]);
    return <RouterProvider router={router}/>;
}

export default App;