import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import "./Test.scss";
import {getAllUserTest} from "../../../apis/user.js";

const Test = () => {
    const [listUser, setListUser] = useState([]);
    const fetchApi = async () => {
        const startTime = new Date().getTime(); // Record start time
        try {
            const res = await getAllUserTest();
            console.log(res);
            setListUser(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            const endTime = new Date().getTime(); // Record end time
            const duration = endTime - startTime; // Calculate duration
            console.log(`API call duration: ${duration} ms`);
        }
    }
    useEffect(() => {
        fetchApi()
    }, []);

    return (
        <div className="table-container container mt-5 mb-5">
            <Table striped bordered hover className="table">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {listUser.map((user, index) => (
                    <tr key={index}>
                        <td>{user.phone}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Test;