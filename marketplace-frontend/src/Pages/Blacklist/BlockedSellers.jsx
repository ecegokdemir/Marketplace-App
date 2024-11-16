import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { Box, Typography, Container } from '@mui/material';
import BlackListCard from '../../Components/Card/BlackListCard';
import { EmptyCart } from '../../Assets/Images/Image';
import { toast } from 'react-toastify';
import { ContextFunction } from '../../Context/Context'; 


const BlockedSellers = () => {
    const { blackListData, setBlackListData, updateWishlist } = useContext(ContextFunction);

    useEffect(() => {
        getBlackList();
    }, []);

    useEffect(() => {
        updateWishlist(blackListData);
    }, [blackListData]);


    const getBlackList = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/blacklist", { withCredentials: true });
            setBlackListData(data.payload);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", { autoClose: 500, theme: 'colored' });
        }
    };

    const removeFromBlacklist = async (sellerId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/blacklist/${sellerId}`, {
                withCredentials: true
            });
            setBlackListData(blackListData.filter(c => c.id !== sellerId));
            toast.success("Seller removed from blacklist", { autoClose: 500, theme: 'colored' });
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", { autoClose: 500, theme: 'colored' });
        }
    };

    return (
        <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', margin: '20px 0', color: '#1976d2' }}>
                Blocked Sellers
            </Typography>
            {blackListData.length === 0 ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="main-card">
                        <img src={EmptyCart} alt="Empty_cart" className="empty-cart-img" />
                        <Typography variant='h6' sx={{ textAlign: 'center', color: '#1976d2' }}>No blocked sellers</Typography>
                    </div>
                </Box>
            ) : (
                <Container maxWidth='lg' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {blackListData.map(seller => (
                        <BlackListCard key={seller.id} seller={seller} removeFromBlacklist={() => removeFromBlacklist(seller.id)} />
                    ))}
                </Container>
            )}
        </Box>
    );
};

export default BlockedSellers;
