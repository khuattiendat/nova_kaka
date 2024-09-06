import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin.jsx";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Menu from "./components/menu/Menu.jsx";
import Login from "./pages/admin/login/Login.jsx";
import "./styles/global.scss";
import './styles/responsive.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import NewUser from "./pages/admin/newUser/NewUser.jsx";
import HomeClient from "./pages/client/HomeCLient/HomeClient.jsx";
import List from "./pages/admin/list/List.jsx";
import React from "react";
import RatingOne from "./pages/client/Rating/RatingOne/Rating.jsx";
import RatingAll from "./pages/client/Rating/RatingAll/Rating.jsx";
import YourTest from "./pages/client/YourTest/YourTest.jsx";
import Wait from "./pages/client/wait/Wait.jsx";
import ListExam from "./pages/client/listExam/ListExam.jsx";
import Exam from "./pages/client/exam/Exam.jsx";


const queryClient = new QueryClient();

function App() {
    const Layout = () => {
        return (
            <div className="main">
                <Navbar/>
                <div className="_container">
                    <div className="menuContainer">
                        <Menu/>
                    </div>
                    <div className="contentContainer">
                        <QueryClientProvider client={queryClient}>
                            <Outlet/>
                        </QueryClientProvider>
                    </div>
                </div>
            </div>
        );
    };
    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Layout/>,
            children: [

                {
                    path: "/admin",
                    element: <HomeAdmin/>,
                },
                // user
                {
                    path: "/admin/user/danh-sach",
                    element: <List type='user'/>,
                },
                {
                    path: "/admin/user/them-moi",
                    element: <NewUser type='user'/>
                },
                {
                    path: "/admin/user/sua/:id",
                    element: <NewUser type='user' isEdit={true}/>
                },
                // exam
                {
                    path: "/admin/exam/danh-sach",
                    element: <List type='exam'/>,
                },
                {
                    path: "/admin/exam/them-moi",
                    element: <NewUser type='exam'/>
                },
                {
                    path: "/admin/exam/sua/:id",
                    element: <NewUser type='exam' isEdit={true}/>
                },
                // question
                {
                    path: "/admin/question/danh-sach",
                    element: <List type='question'/>,
                },
                {
                    path: "/admin/question/them-moi",
                    element: <NewUser type='question'/>
                },
                {
                    path: "/admin/question/sua/:id",
                    element: <NewUser type='question' isEdit={true}/>
                }
            ],
        },
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: <HomeClient/>
                },
                {
                    path: '/danh-sach-cuoc-thi',
                    element: <ListExam/>
                },
                {
                    path: '/phong-cho/:id',
                    element: <Wait/>
                },
                {
                    path: '/bang-xep-hang/:id',
                    element: <RatingOne/>
                },
                {
                    path: '/bang-xep-hang-all/:id',
                    element: <RatingAll/>
                },
                {
                    path: '/thi/:id',
                    element: <Exam/>
                },
                {
                    path: '/bai-thi-cua-ban',
                    element: <YourTest/>
                }
            ]
        },
        {
            path: "/admin/login",
            element: <Login/>,
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
