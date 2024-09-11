import Navbar from "../../../components/navbar/Navbar.jsx";
import Menu from "../../../components/menu/Menu.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Outlet} from "react-router-dom";
import React from "react";

const queryClient = new QueryClient();
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
export default Layout;