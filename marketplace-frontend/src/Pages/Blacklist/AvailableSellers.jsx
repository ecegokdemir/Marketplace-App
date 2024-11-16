import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container } from '@mui/material';
import { ContextFunction } from '../../Context/Context';
import SellerCard from './SellerCard'; 
import { EmptyCart } from '../../Assets/Images/Image';
import { toast } from 'react-toastify';

const AvailableSellers = ({ addToBlacklist }) => {
    const { blackListData, setBlackListData, availableSeller, setAvailableSeller } = useContext(ContextFunction);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        getAvailableSellers();
    }, [blackListData]);


    const getAvailableSellers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/sellers?search=&size=50&page=0", { withCredentials: true });
            const filteredSellers = data.payload.filter(seller => !blackListData.some(blocked => blocked.id === seller.id));
            setAvailableSeller(filteredSellers);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", { autoClose: 500, theme: 'colored' });
        }
    };

    return (
        <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', margin: '20px 0', color: '#1976d2' }}>
                Available Sellers
            </Typography>
            {availableSeller.length === 0 ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="main-card">
                        <img src={EmptyCart} alt="Empty_cart" className="empty-cart-img" />
                        <Typography variant='h6' sx={{ textAlign: 'center', color: '#1976d2' }}>No available sellers</Typography>
                    </div>
                </Box>
            ) : (
                <Container maxWidth='lg' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {availableSeller.map(seller => (
                        <SellerCard key={seller.id} seller={seller} addToBlacklist={addToBlacklist} />
                    ))}
                </Container>
            )}
        </Box>
    );
};

export default AvailableSellers;
