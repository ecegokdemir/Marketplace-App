import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Container } from '@mui/material';
import BasicTabs from '../Components/AdminTabs';
import CopyRight from '../../Components/CopyRight/CopyRight'

const AdminHomePage = () => {
    const [user, setUser] = useState([]);
    const [seller, setSeller] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        getSeller();
    }, [])


    let navigate = useNavigate()
    const getUser = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/users?search=&size=30&page=0", {
                withCredentials: true
            });
            setUser(data.payload)
        } catch (error) {
            navigate('/')
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
        }
    }
    const getSeller = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/sellers?search=&size=50&page=0", {
                withCredentials: true
            });
            setSeller(data.payload)
        } catch (error) {
            navigate('/')
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
        }
    }
    return (
        <>

            <Container maxWidth="100%">
                <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>Dashboard </h1>
                <BasicTabs user={user} getUser={getUser} seller={seller} getSeller={getSeller} />
            </Container>
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}

export default AdminHomePage