import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {io} from "socket.io-client";
import {setSocketConnection} from "../../../redux/userSlice.js";
import {useDispatch, useSelector} from "react-redux";

const queryClient = new QueryClient();
const LayoutClient = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?._id === '') {
            navigate('/login');
        }
        const socketConnection = io(process.env.REACT_APP_SERVER_URL);
        dispatch(setSocketConnection(socketConnection));
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <div className="">
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </div>
    );
};

export default LayoutClient;