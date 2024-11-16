import { Container } from '@mui/system';
import axios from 'axios';
import CartCard from '../../Components/Card/CartCard/CartCard';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContextFunction } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { AiFillCloseCircle, AiOutlineLogin } from 'react-icons/ai';
import { EmptyCart } from '../../Assets/Images/Image';
import { Transition } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';

const Wishlist = () => {
    const { wishlistData, setWishlistData, blackListData, updateWishlist } = useContext(ContextFunction);
    const [openAlert, setOpenAlert] = useState(false);

    const setProceed = true; // Assuming user is authenticated for demonstration
    const navigate = useNavigate();

    useEffect(() => {
        getWishList();
    }, []);

    useEffect(() => {
        updateWishlist(wishlistData);
    }, [blackListData]);

    const getWishList = async () => {
        if (setProceed) {
            try {
                const { data } = await axios.get("http://localhost:8080/api/v1/favorites", {
                    withCredentials: true
                });
                setWishlistData(data.payload);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch wishlist", { autoClose: 500, theme: 'colored' });
            }
        } else {
            setOpenAlert(true);
        }
    };

    const removeFromWishlist = async (product) => {
        if (setProceed) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/favorites/${product.productId}`, {
                    withCredentials: true
                });
                setWishlistData(wishlistData.filter(c => c.productId !== product.productId));
                toast.success("Removed From Wishlist", { autoClose: 500, theme: 'colored' });
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred", { autoClose: 500, theme: 'colored' });
            }
        }
    };

    const handleClose = () => {
        setOpenAlert(false);
        navigate('/');
    };

    const handleToLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <Typography
                variant='h3'
                sx={{
                    textAlign: 'center',
                    margin: "20px 0",
                    color: '#1976d2',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #1976d2',
                    paddingBottom: 1
                }}
            >
                Wishlist
            </Typography>

            {setProceed && wishlistData.length <= 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 5
                    }}
                >
                    <img src={EmptyCart} alt="Empty Cart" style={{ width: '300px', marginBottom: '20px' }} />
                    <Typography
                        variant='h6'
                        sx={{
                            textAlign: 'center',
                            color: '#1976d2',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}
                    >
                        No products in wishlist
                    </Typography>
                </Box>
            ) : (
                <Container
                    maxWidth='xl'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: 2
                    }}
                >
                    {wishlistData.map(product => (
                        <CartCard
                            product={product}
                            removeFromCart={removeFromWishlist}
                            key={product.productId}
                            sx={{ margin: 2 }}
                        />
                    ))}
                </Container>
            )}

            <Dialog
                open={openAlert}
                keepMounted
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent
                    sx={{
                        width: { xs: 280, md: 350, xl: 400 },
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant='h5'>Please Login To Proceed</Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        padding: '16px'
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={handleToLogin}
                        endIcon={<AiOutlineLogin />}
                        color='primary'
                    >
                        Login
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        endIcon={<AiFillCloseCircle />}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    );
};

export default Wishlist;
