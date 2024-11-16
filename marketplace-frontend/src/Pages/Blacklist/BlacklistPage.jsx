import React from 'react';
import { useContext } from 'react';
import { Container, Grid } from '@mui/material';
import AvailableSellers from './AvailableSellers';
import BlockedSellers from './BlockedSellers';
import { ContextFunction } from '../../Context/Context'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const BlacklistPage = () => {
    const { blackListData, setBlackListData ,availableSeller, setAvailableSeller} = useContext(ContextFunction);

    const addToBlacklist = async (seller) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/blacklist/block`, null, {
                params: { sellerId: seller.id },
                withCredentials: true
            });
            setBlackListData([...blackListData, seller])
            setAvailableSeller(prev => prev.filter(s => s.id !== seller.id));
            toast.success("Added to blacklist", { autoClose: 500, theme: 'colored' });
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", { autoClose: 500, theme: 'colored' });
        }
    };


    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AvailableSellers addToBlacklist={addToBlacklist} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BlockedSellers/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BlacklistPage;
